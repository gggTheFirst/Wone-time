import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginInfo = {
  newUser: boolean;
  loginStatus: boolean;
  userName?: string;
  userId: string;
  changeState: (value: boolean) => void;
  resetStore: () => void;
};

// export const useLoginInfo = create<LoginInfo>((set) => ({
//     newUser : false,
//     loginStatus : false,
//     changeState: (value) => set({newUser : value})
// }))

const defaultVals = {
  newUser: false,
  loginStatus: false,
  userName: "",
  userId: "",
};

export const useLoginInfo = create<LoginInfo>()(
  persist(
    (set) => ({
      ...defaultVals,
      changeState: (value) => set({ newUser: value }),

      resetStore: () => set({ ...defaultVals }),
    }),
    {
      name: "user-storage",
    }
  )
);
