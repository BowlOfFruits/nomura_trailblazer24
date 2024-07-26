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

interface Price {
    value: number,
    day: Date,
}

interface StockCardProps {
    name: string, 
}

interface StockData {
    companyName: string,
    volume: number, 
    priceBought: number, 
    currentPrice: number, 
    historicalPrices: Price[],
}

const StockCard: React.FC<StockCardProps> = ({name}) => {
    const [stockData, setStockData] = useState<StockData>({companyName: "", volume: 0, priceBought: 0, currentPrice: 0, historicalPrices: []})
    const [isLoading, setIsLoading] = useState(true)
    const portfolioStore = usePortfolioStore();
    const userStore = useUserStore();

    useEffect(() => {
        const stock = portfolioStore.stocks.find(stock => stock.stockName === name);
        setStockData(stock);
        setIsLoading(false);
        // getApi(`/api/stock/${userStore.user}/${name}`, data => {setStockData(data)}, err => console.log(err), () => setIsLoading(false))
    }, [])
    const options = {
        chart: {
            title: `Price of ${name}`,
            subtitle: "USD",
        },
    };

    const generateData = () => {
        const data: any[] = [["Day", "Price"]]
        for (let i = 0; i < stockData.historicalPrices.length; i++) {
            data.push([stockData.historicalPrices[i].day.toDateString(), stockData.historicalPrices[i].value])
        }
        return data;
    }

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
                <Panel header={name} key="1">
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
    
    return (
        generateCard(
            <>
                <div>
                    <span className='p-2'><span className='font-bold'>Company:</span> {stockData.companyName}</span>
                    <span className='p-2'><span className='font-bold'>Price bought:</span> {stockData.priceBought}</span> 
                    <span className='p-2'><span className='font-bold'>Current price:</span> {stockData.currentPrice}</span>
                    <span className='p-2'><span className='font-bold'>Volume:</span> {stockData.volume}</span>
                </div>
                {/* <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={generateData()}
                    options={options}
                /> */}
            </>          
        )
    );
}

export default StockCard;