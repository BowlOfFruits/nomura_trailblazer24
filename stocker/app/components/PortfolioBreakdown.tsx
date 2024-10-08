import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { PortfolioComponent } from '../chat/types';
import { getApi } from '../api';
import usePortfolioStore from '../context/portfolioStore';

const PieChartWithClick = () => {
    const [data, setData] = useState<PortfolioComponent[]>([]);
    const portfolioStore = usePortfolioStore();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const stocks = portfolioStore.stocks.map(stock => ({
            type: stock.stockName, // Set the type to the stock name
            value: stock.volume * stock.priceBought // Calculate and set the value
        }));

        setData(stocks); // Set the data to the stocks from the store
        setIsLoading(false); // Mark loading as complete

    }, [])

    const generateOptions = () => {
        const options = {
            title: 'Portfolio breakdown',
            pieSliceText: 'label',
            slices: {
            0: { offset: 0.1 },
            1: { offset: 0.1 },
            2: { offset: 0.1 },
            3: { offset: 0.1 },
            4: { offset: 0.1 },
            },
        };
        return options
    }

    const generateChartData = () => {
        const chartData: any[] = [["Hi", "bye"]];
        for (let i = 0; i < data.length; i++) {
            chartData.push([data[i].type, data[i].value])
        }
        return chartData;
    }


  const handleClick = (chartWrapper) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
        const item = selection[0];
        const label = data[item.row].type; // Adjust according to your data structure
    }
  };

  return (
    <Chart
    className='w-full m-5'
    chartType="PieChart"
    width="100%"
    height="70vh"
    data={generateChartData()}
    options={generateOptions()}
    chartEvents={[
        {
            eventName: "select", 
            callback: ({chartWrapper}) => handleClick(chartWrapper)
        }
    ]}
    />
  );
};

export default PieChartWithClick;
