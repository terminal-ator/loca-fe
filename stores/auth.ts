import { Account, UserType } from '@/api/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
    currentPhone: string;
    setPhone: (phone: string) => void;
    currentUser: UserType | null;
    authUser: UserType | null;
    authToken: string | null;
    authAccount: Account | null;
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