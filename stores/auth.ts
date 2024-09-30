import { Account, UserType } from '@/api/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserSignUp{
    username: string;
    name: string;
    referral?: string;
}


interface AuthStore {
    currentPhone: string;
    setPhone: (phone: string) => void;
    currentUser: UserType | null;
    authUser: UserType | null;
    authToken: string | null;
    authAccount: Account | null;
    signUpData: UserSignUp;
    setUserSignUpData: (data: UserSignUp) => void;
    setAuthAccount: (account: Account) => void;
    setAuthUser: (user: UserType) => void;
    setAuthToken: (token: string) => void;
    setUser: (user: UserType) => void;
    clearAuth: () => void;
}

const useAuthStore = create<AuthStore>()(
    persist((set) => ({
    currentPhone:'',
    currentUser: null,
    authUser: null,
    authToken: null,
    authAccount: {
        id: 'somerandomid',
        name: "Tushar Garg",
        owner: 'someotherrandomid',
        is_main: true,
        username: 'BigDawg'
    },
    signUpData: {
        name:"",
        username: "",
        referral:""
    },
    setUserSignUpData: (data) => {set({ signUpData: data })},
    setAuthAccount: (account: Account) => set({ authAccount: account }),
    setPhone: (phone: string) => set({ currentPhone: phone }),
    setUser: (user: UserType) => set({ currentUser: user }),
    setAuthUser: (user: UserType) => set({ authUser: user }),
    setAuthToken: (token: string) => set({ authToken: token }),
    clearAuth: () => set({ authUser: null, authToken: null, authAccount: null, currentPhone: '', currentUser: null }),
    
}), {
    name: 'auth',
    storage: createJSONStorage(()=> AsyncStorage),
}));

export default useAuthStore;