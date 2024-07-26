'use client'

import react, { useEffect, useState } from "react"
import StockCard from "../components/StockCard";
import { getApi } from "../api";
import { Col, Row, Spin } from "antd";
import PortFolioBreakdown from "../components/PortfolioBreakdown";
import AddPurchase from "./AddPurchase";
import usePortfolioStore from "../context/portfolioStore";

const Portfolio: React.FC<{}> = () => {
  const [stocks, setStocks] = useState<string[]>([])

  const portfolioStore = usePortfolioStore();
  useEffect(() => {
    setStocks(portfolioStore.stocks.map(stock => stock.stockName))
  }, [])

  return (
    <>
    <Row>
    </Row>
    <Row>
      <Col span={16}>
        {
          stocks.map(stock => <StockCard key={stock} name={stock} />)
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