import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginInfo = {
    newUser : boolean;
    loginStatus : boolean;
    userName? : string
    userId : string;
    changeState: (value : boolean) => void;
}

// export const useLoginInfo = create<LoginInfo>((set) => ({
//     newUser : false,
//     loginStatus : false,
//     changeState: (value) => set({newUser : value})
// }))

export const useLoginInfo = create<LoginInfo>()(persist(
    (set) => ({
        newUser : false,
        loginStatus: false,
        userName : "",
        userId : "",
        changeState: (value) => set({newUser : value})
    }),{
        name : 'user-storage',
    }
    ))