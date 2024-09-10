import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Conf {
    hasAdded: string;
    invalidateHasAdded: () => void;
}

const gen = ()=>{
    return  Math.random().toString(36).substring(2,7);
}

const useConfStore = create<Conf>()(
    persist((set) => ({
        hasAdded: gen(),
        invalidateHasAdded: () => set({ hasAdded: gen() }),
    }), {
        name: 'conf',
        storage: createJSONStorage(()=> AsyncStorage),
    })
);

export default useConfStore;