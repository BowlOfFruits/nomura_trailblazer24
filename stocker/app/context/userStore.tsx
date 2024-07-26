import { create } from "zustand";

interface UserStore {
    user: string,
    setUser: (user: string) => void,
}

const useUserStore = create<UserStore>((set) => ({
    user: "cyc",
    setUser: (user: string) => set((state) => ({ user: user }))
}))

export default useUserStore; 
