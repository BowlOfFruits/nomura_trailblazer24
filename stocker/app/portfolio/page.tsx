'use client'

import react, { useEffect, useState } from "react"
import StockCard from "../components/StockCard";
import { Col, Row, Spin } from "antd";
import PortFolioBreakdown from "../components/PortfolioBreakdown";
import usePortfolioStore from "../context/portfolioStore";

interface PortfolioStock {
  stockName: string,
  volume: number, 
  priceBought: number, 
}

const Portfolio: React.FC<{}> = () => {
  const [stocks, setStocks] = useState<PortfolioStock[]>([])

  const portfolioStore = usePortfolioStore();
  useEffect(() => {
    setStocks(portfolioStore.stocks)
  }, [])

  return (
    <>
    <Row>
    </Row>
    <Row>
      <Col span={16}>
        {
          stocks.map(stock => <StockCard key={stock.stockName} stock={stock} />)
        }
      </Col>
      <Col span={8}>
        <PortFolioBreakdown/>
      </Col>
    </Row>
    </>
  );
};

export default Portfolio;