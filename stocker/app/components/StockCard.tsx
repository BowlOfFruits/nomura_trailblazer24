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
        getApi(`/api/stock/${stock.stockName}`, data => {setPrices(data)}, err => console.log(err), () => setIsLoading(false))
    }, [])

    const options = {
        chart: {
            title: `Price of ${name}`,
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
        const data: any[] = [["Day", "Price"]]
        if ("historial" in prices) {
            data.concat(Object.entries(prices["historical"]))
        }
        console.log(data, prices);
        return data;
    }

    return (
        generateCard(
            <>
                <div>
                    <span className='p-2'><span className='font-bold'>Price bought:</span> {stock.priceBought}</span> 
                    {/* <span className='p-2'><span className='font-bold'>Current price:</span> {stock.}</span> */}
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