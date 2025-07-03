import type { ProjectData, TimeEntryData } from "../types";

export function getProjectName(id: string, projects: ProjectData[]): string {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) return projects[i].name;
  }
  return "id";
}

export function calcTotalHours(timeEntries: TimeEntryData[]) {
  let total: number = 0;
  for (let i = 0; i < timeEntries.length; i++) {
    total +=
      timeEntries[i].hours +
      parseFloat((timeEntries[i].minutes / 60).toFixed(2));
  }
  return total;
}

export function projectTimeInfo(
  timeEntries: TimeEntryData[],
  projects: ProjectData[]
) {
  const proj_summaries = projects.map((project) => {
    const relatedTimeEntries = timeEntries.filter(
      (entry) => project.id === entry.projectId
    );
    const totalH = calcTotalHours(relatedTimeEntries);
    return {
      name: project.name,
      description: project.description,
      projectTimeEntries: relatedTimeEntries,
      totalHours: totalH,
    };
  });

  return proj_summaries;
}

export function getSummarisedTimeInfo(
  timeEntries: TimeEntryData[],
  projects: ProjectData[]
) {
  const newTimeEnrtyFormat = timeEntries.map((entry) => {
    const relatedProjects = projects.filter(
      (project) => project.id === entry.projectId
    );
    return {
      id: entry.id,
      projectId: relatedProjects[0].id,
      projectName: relatedProjects[0].name,
      date: entry.date,
      notes: entry.notes,
      duration: Number((entry.hours + entry.minutes / 60).toFixed(2)),
    };
  });

  return newTimeEnrtyFormat;
}

export function weekInfo(timeEntries: TimeEntryData[]) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);

  const constWeekTimeEntries = timeEntries.filter(
    (entry) => new Date(entry.date) >= cutoff
  );

  // map of time and recent days
  const timePerDayMap: Record<string, number> = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const isoDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    timePerDayMap[isoDate] = 0;
  }

  constWeekTimeEntries.forEach((entry) => {
    const day = new Date(entry.date).toISOString().split("T")[0]; // "YYYY-MM-DD"
    timePerDayMap[day] =
      timePerDayMap[day] + Number(entry.hours * 60 + entry.minutes) / 60;
  });

  const dailyHours = Object.entries(timePerDayMap).map(([date, hours]) => {
    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
    return {
      date,
      day: dayName,
      hours: Number(hours.toFixed(2)),
    };
  });

  //sort an array
  const sortedByDate = [...dailyHours].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const totalTime = Object.values(timePerDayMap).reduce((sum, val) => {
    return sum + val;
  }, 0);

  const avgHours = parseFloat((totalTime / 7).toFixed(2));
  return {
    totalHours: totalTime.toFixed(2),
    averageHours: avgHours.toFixed(2),
    dailyTimes: sortedByDate,
  };
}
type ProjectWorkData = {
  day: string; // 'Mon', 'Tue', etc.
  [projectName: string]: number; // ProjectA, ProjectB, etc.
};

export const getProjectWorkData = (
  logEntries: TimeEntryData[],
  projects: ProjectData[]
): ProjectWorkData[] => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentEntries = logEntries.filter(
    (entry) => new Date(entry.date) >= cutoff
  );

  // Step 2: Total hours per project
  const projectTotals: Record<string, number> = {};
  recentEntries.forEach((entry) => {
    projectTotals[entry.projectId] =
      (projectTotals[entry.projectId] || 0) + entry.hours;
  });

  // Step 3: Top 3 projects
  const topProjects = Object.entries(projectTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([projectId]) => projectId);

  // Step 4: Initialize results
  const result: ProjectWorkData[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const day = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Mon"

    const row: ProjectWorkData = { day };

    topProjects.forEach((projectId) => {
      const entriesForDay = recentEntries.filter((e) => {
        const entryDate = new Date(e.date);
        return (
          e.projectId === projectId &&
          entryDate.toDateString() === date.toDateString()
        );
      });

      const totalHours = entriesForDay.reduce((sum, e) => sum + e.hours, 0);
      row[getProjectName(projectId, projects)] = totalHours;
    });

    result.unshift(row); // Add in correct order: Mon → Today
  }
  return result;
};

export function getTopTimeEntries(
  logEntries: TimeEntryData[]
): TimeEntryData[] {
  const topEnrtries: TimeEntryData[] = logEntries
    .sort((a, b) => b.hours + b.minutes / 60 - (a.hours + a.minutes / 60))
    .slice(0, 5);
  return topEnrtries;
}
