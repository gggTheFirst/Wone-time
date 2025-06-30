// src/api.ts
import axios from "axios";
import { auth } from "./firebase";

import { type ProjectData, type TimeEntryData, type UserData } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL, // Replace with your real base URL
});

// add new user
export const addNewUser = async (UserAccount: UserData) => {
  const key = await auth.currentUser?.getIdToken();

  const response = await api({
    method: "post",
    url: "/users",
    data: UserAccount,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
  return response;
};

export async function getUserInfo(id: string) {
  const key = await auth.currentUser?.getIdToken();
  const response = await api({
    method: "get",
    headers: {
      Authorization: `Bearer ${key}`,
    },
    url: `/users/${id}`,
  });
  return response.data;
}

// create project
export const createProject = async (newProj: ProjectData) => {
  const key = await auth.currentUser?.getIdToken();
  const response = await api({
    method: "post",
    url: "/projects",
    data: newProj,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });

  return response;
};

//getting projects
export async function getProjects(user_id: string) {
  const key = await auth.currentUser?.getIdToken();

  const response = await api({
    method: "get",
    url: `/projects/user/${user_id}`,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });

  return response.data;
}

//get time entries
export async function getTimeEntries(user_id: string) {
  const key = await auth.currentUser?.getIdToken();

  const response = await api({
    method: "get",
    url: `/time-entries/user/${user_id}`,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });

  return response.data;
}

export const editTimeRecords = async ({
  id,
  newData,
}: {
  id: string;
  newData: TimeEntryData;
}) => {
  const key = await auth.currentUser?.getIdToken();
  const response = await api({
    method: "patch",
    url: `/time-entries/${id}`,
    data: newData,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
  return response.data; // Return updated data
};

export const deleteTimeRecord = async (id: string) => {
  const key = await auth.currentUser?.getIdToken();
  const response = await api({
    method: "delete",
    url: `time-enteries/${id}`,
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
  return response;
};

export default api;
