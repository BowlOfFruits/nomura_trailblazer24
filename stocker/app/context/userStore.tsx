import { create } from "zustand";

interface UserStore {
    user: string,
    setUser: (user: string) => void,
    riskTolerance: string,
    setRiskTolerance: (tolerance: string) => void;
    sector: string[], 
    setSector: (sector: string[]) => void,
    investmentHorizon: string, 
    setInvestmentHorizon: (horizon: string) => void, 
}

const useUserStore = create<UserStore>((set) => ({
    user: "cyc",
    setUser: (user: string) => {set((state) => ({ user: user }))},
    riskTolerance: "low", 
    setRiskTolerance: (tolerance: string) => set(() => ({riskTolerance: tolerance})),
    sector: ["Healthcare"],
    setSector: (sector: string[]) => set((state) => ({ sector: sector})),
    investmentHorizon: "long-term", 
    setInvestmentHorizon: (horizon: string) => set((state) => ({ investmentHorizon: horizon})),
}))

export default useUserStore; 
