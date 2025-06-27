export type ErrorMessage = {
  hasError: boolean;
  message: string;
};

export type ProjectData = {
  id : string;
  userId? : string; 
  name : string;
  description : string;
}

export type TimeEntryData = {
  projectId : string;
  userId : string;
  date: Date;
  time: Date;
  notes: string;
  created? : Date;
  updated? : Date;
}

export type UserData = {
  id? : string;
  name: string;
  email: string;
  userId? : string;
}