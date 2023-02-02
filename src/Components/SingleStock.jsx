import React, { useEffect, useState } from "react";
import AboutSection from "./AboutSection";
import SingleStockNews from "./SingleStockNews";
import StockGraph from "./StockGraph";
import { useParams } from "react-router-dom";
import StockCalendar from "./StockCalendar";
import "./singleStock.css";
import StockAI from "./StockAI";
import * as api from "../utils/api";

const SingleStock = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState({});
  const [isAboutLoading, setIsAboutLoading] = useState(true);

  useEffect(() => {
    setIsAboutLoading(true);
    api.getSingleStock(symbol).then((stockData) => {
      setStock(stockData);
      setIsAboutLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <section className="about-section_container">
      <StockAI stock={stock} />
      <div className="graph">
        <StockGraph />
      </div>
      <div className="about">
        <AboutSection
          symbol={symbol}
          stock={stock}
          isAboutLoading={isAboutLoading}
        />
      </div>
      <div className="news">
        <SingleStockNews symbol={symbol} />
      </div>
      <div className="calender">
        <StockCalendar ticker={symbol} />
      </div>
    </section>
  );
};

export default SingleStock;

