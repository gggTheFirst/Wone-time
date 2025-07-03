export type ErrorMessage = {
  hasError: boolean;
  message: string;
};

export type ProjectData = {
  id: string;
  userId?: string;
  name: string;
  description: string;
};

export type TimeEntryData = {
  id: string;
  projectId: string;
  userId: string;
  date: Date;
  hours: number;
  minutes: number;
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserData = {
  id?: string;
  name: string;
  email: string;
  userId?: string;
};

export interface EditInfo {
  entryId?: string;
  projectId?: string;
  notes?: string;
  duration?: number;
}
