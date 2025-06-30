import type { ProjectData, TimeEntryData } from "../types";

export function calcTotalHours(timeEntries: TimeEntryData[]) {
  let total: number = 0;
  for (let i = 0; i < timeEntries.length; i++) {
    total += timeEntries[i].time;
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

export function weekInfo(timeEntries: TimeEntryData[]) {
  const sevenDaysAgo = new Date(); // Get current date
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Subtract 7 days

  const constWeekTimeEntries: TimeEntryData[] = timeEntries.filter(
    (entry) => entry.date >= sevenDaysAgo
  );

  let dailyAvg = constWeekTimeEntries.reduce((avg, entry) => {
    return avg + entry.time;
  }, 0);

  dailyAvg /= constWeekTimeEntries.length;
}
