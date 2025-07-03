import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TimeEntryData } from "../types";

type TimeStatistics = {
  TotalHours: number;
  DailyAverage: number;
  DailyTimes: number;
  WeeklyTotal?: number;
  ProjectTotals: string;
  ProjectEntries: TimeEntryData;
};

export const useLoginInfo = create<LoginInfo>()(
  persist(
    (set) => ({
      newUser: false,
      loginStatus: false,
      userName: "",
      userId: "",
      changeState: (value) => set({ newUser: value }),
    }),
    {
      name: "user-storage",
    }
  )
);
