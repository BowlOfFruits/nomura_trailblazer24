const be_url = "http://127.0.0.1:5000"

const generateFakeHistorialData = (length: number) => {
    const data = []
    let currentDate = new Date()
    for (let i = 0; i < length; i++) {
        data.push({ day: currentDate, value: Math.random() * 20})
        currentDate.setHours(currentDate.getHours() - 2)
    }
    return data
}

const pingStocker = (query: string, riskTolerance: string, investmentHorizon: string, currentPortfolio: string[], preferredSectors: string[]) => {
    return fetch(be_url + "/stocker/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_data: {
                risk_tolerance: riskTolerance, 
                investment_horizon: investmentHorizon,
                current_portfolio: currentPortfolio,
                preferred_sectors: preferredSectors
            }, 
            query: query
        })
    })
    .then(response => response.json())
    .then(response => response.message)
}

const getApi = (url: string, onData: (data: any) => void, onError: (err: Error) => void, onFinal: () => void) => {
    console.log(url)
    if (url == "/api/stock/APPL") {
        onData({
            priceBought: 10, 
            volume: 100, 
            currentPrice: 20, 
            historicalPrices: generateFakeHistorialData(10)
        })
        onFinal()
        return 
    } 

    if (url == "/api/portfolio/cyc/stock") {
        onData(["APPL"])
        onFinal()
        return
    }

    if (url == "stocker/chat") {
        onData("Hello! This is StockerAI, your friendly neighbour trade recommender.")
        onFinal()
        return
    }
    
    if (url == "stocker/cat") {
        fetch("https://catfact.ninja/fact")
            .then(response => response.json())
            .then(data => onData(data.fact))
            .catch(error => onError(error))
            .finally(onFinal);
        return
    }

    if (url == "/api/portfolio/cyc/all") {
        onData([
            {
                type: "T Bonds", 
                value: 100
            }, 
            {
                type: "Stocks", 
                value: 200
            }, 
            {
                type: "Cash", 
                value: 500
            }
        ]);
        onFinal();
        return;
    }

    fetch(be_url + url)
        .then(response => response.json())
        .then(data => onData(data))
        .catch(error => onError(error))
        .finally(onFinal);
}

export {
    getApi,
    pingStocker
}
