import { create } from 'zustand';

type LoginInfo = {
    newUser : boolean;
    loginStatus : boolean;
    changeState: (value : boolean) => void;
}

export const useLoginInfo = create<LoginInfo>((set) => ({
    newUser : false,
    loginStatus : false,
    changeState: (value) => set({newUser : value})
}))