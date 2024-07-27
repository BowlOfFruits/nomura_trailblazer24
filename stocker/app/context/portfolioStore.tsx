import { create } from "zustand";

interface PortfolioStock {
    stockName: string,
    volume: number, 
    priceBought: number, 
}

interface PortfolioStore {
    stocks: PortfolioStock[],
    addStock: (stock: PortfolioStock) => void
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
    stocks: [{stockName: "AAPL", volume: 100, priceBought: 10},
    ],
    addStock: (stock: PortfolioStock) => set((state) => ({ stocks: [...state.stocks, stock]}))
}))

export default usePortfolioStore; 
