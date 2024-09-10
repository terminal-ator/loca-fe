import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Pincodes {
    pincodes: string[];
    setPincodes: (pincodes: string[]) => void;
    seletedPincode: string;
    setSelectedPincode: (pincode: string) => void;
}

const usePincodeStore = create<Pincodes>()(
    persist((set) => ({
        pincodes: [],
        setPincodes: (pincodes: string[]) => set({ pincodes }),
        seletedPincode: '203207',
        setSelectedPincode: (pincode: string) => set({ seletedPincode: pincode }),
    }), {
        name: 'pincode',
        storage: createJSONStorage(()=> AsyncStorage),
    })
);

export default usePincodeStore;