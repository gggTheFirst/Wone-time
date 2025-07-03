import { useMutation } from "@tanstack/react-query";
import { auth } from "../services/firebase";
import api from "../services/api";
import { useLoginInfo } from "../stores/loginState";
type TimeEntryData = {
  projectId: string;
  userId: string;
  notes: string;
  date: Date;
  hours: number;
  minutes: number;
  createdAt: Date;
  updatedAt: Date;
};

// Replace with your actual mutation/post logic
const postLogEntry = async (LogEntry: TimeEntryData) => {
  const key = await auth.currentUser?.getIdToken();
  console.log(key);
  const response = await api({
    method: "post",
    url: "/time-entries",
    data: LogEntry,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
  console.log(response);
  return response.data;
};

export const DummyDataUploader = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postLogEntry,
  });

  // const dummyProjects = ["Project A", "Project B", "Operation testing", "rwr"];
  const dummyProjects = [
    "6e6204ff-5950-4beb-9405-6b90ab75b329",
    "3edbb06e-2be4-4e34-9442-381636386526",
    "c718afa4-a5c2-4085-b082-a71118207dba",
    "5bd88f1a-cb5c-4155-88ce-f5ac07e9b3a1",
  ];

  const dummyNotes = [
    "Worked on frontend layout",
    "Debugged API issues",
    "Team sync and planning",
    "Code review and cleanup",
    "Implemented feature X",
    "Meeting with stakeholders",
    "Optimized performance",
  ];

  const generateDummyEntry = (): TimeEntryData => {
    const randomProject =
      dummyProjects[Math.floor(Math.random() * dummyProjects.length)];
    const randomNote =
      dummyNotes[Math.floor(Math.random() * dummyNotes.length)];
    const hours = Math.floor(Math.random() * 4) + 1; // 1 to 4 hours
    const minutes = Math.floor(Math.random() * 60);

    const daysAgo = Math.floor(Math.random() * 7); // Within last 7 days
    const entryDate = new Date();
    entryDate.setDate(entryDate.getDate() - daysAgo);

    return {
      projectId: randomProject,
      userId: useLoginInfo.getState().userId,
      notes: randomNote,
      date: entryDate,
      hours,
      minutes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const uploadDummyData = async () => {
    for (let i = 0; i < 15; i++) {
      const entry = generateDummyEntry();
      try {
        await mutateAsync(entry);
        console.log(`Entry ${i + 1} uploaded`);
      } catch (err) {
        console.error(`Error uploading entry ${i + 1}`, err);
      }
    }
  };

  return <button onClick={uploadDummyData}>Upload Dummy Data</button>;
};
