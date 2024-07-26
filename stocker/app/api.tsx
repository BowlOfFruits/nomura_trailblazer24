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
        mode: 'no-cors',
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

    fetch(be_url + url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {console.log(data); onData(data)})
    .catch(error => onError(error))
    .finally(onFinal);
}

export {
    getApi,
    pingStocker
}
