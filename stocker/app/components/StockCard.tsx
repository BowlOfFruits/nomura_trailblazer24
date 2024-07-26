'use client'

import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Chart } from "react-google-charts";
import { Spin } from 'antd';
import { getApi } from '../api';
import { Collapse } from 'antd';
import useUserStore from '../context/userStore';
import usePortfolioStore from '../context/portfolioStore';

const { Panel } = Collapse;

interface PortfolioStock {
    stockName: string,
    volume: number, 
    priceBought: number, 
}  

interface Price {
    value: number,
    day: Date,
}

interface StockCardProps {
    stock: PortfolioStock, 
}

interface StockData {
    volume: number, 
    priceBought: number, 
    currentPrice: number, 
    historicalPrices: Price[],
}

const StockCard: React.FC<StockCardProps> = ({stock}) => {
    const [prices, setPrices] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getApi(`/api/stock/${stock.stockName}`, data => {console.log(data); setPrices(data)}, err => console.log(err), () => setIsLoading(false))
    }, [])

    const options = {
        chart: {
            title: `Price of ${stock.stockName}`,
            subtitle: "USD",
        },
    };

    
    const generateCard = (children: React.ReactNode) => {
        return (
            <Collapse
                className='my-3 bg-white'
                bordered={false}
                // ghost
                // defaultActiveKey={['1']}
                // items={[
                // { key: '1', label: '', children: children}]}
            >
                <Panel header={stock.stockName} key="1">
                    {children}
                </Panel>
            </Collapse>
        );
    }
    
    if (isLoading) {
        return (
            generateCard(<Spin />)
        );
    }
    
    const generateData = () => {
        let data: any[] = [["Day", "Price", "Prediction"]]
        if (isLoading) {
            return data
        }
        const allTimestamps = prices["historical"].map(price => price[0]).concat(prices["prediction"].map(price => price[0]))
        const length = prices["historical"].length  + prices["prediction"].length
        const paddedHist = prices["historical"].map(x => x[1]).concat(Array(prices["prediction"].length).fill(null))
        const paddedPred = Array(prices["historical"].length).fill(null).concat(prices["prediction"].map(x => x[1]))

        for (let i = 0; i < length; i++) {
            data.push([allTimestamps[i], paddedHist[i], paddedPred[i]])
        }
        return data;
    }

    return (
        generateCard(
            <>
                <div>
                    <span className='p-2'><span className='font-bold'>Price bought:</span> {stock.priceBought}</span> 
                    <span className='p-2'><span className='font-bold'>Current price:</span> {parseFloat(prices["current_price"]).toFixed(2)}</span>
                    <span className='p-2'><span className='font-bold'>Volume:</span> {stock.volume}</span>
                </div>
                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={generateData()}
                    options={options}
                />
            </>          
        )
    );
}

export default StockCard;