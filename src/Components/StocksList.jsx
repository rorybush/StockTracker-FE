import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import { Link } from "react-router-dom";
import { Box, CircularProgress, Card, useTheme } from "@mui/material";
import "./stocksList.css";

import moment from "moment-timezone";

const StocksList = () => {
  const [stocksList, setStocksList] = useState([]);
  const [prices, setPrices] = useState({});
  const [previous, setPrevious] = useState({});
  const [IsStockListLoading, setIsStockListLoading] = useState(false);
  // const theme = useTheme();

  const marketsOpen = moment.tz("09:30", "America/New_York").format();
  const marketsClose = moment.tz("16:00", "America/New_York").format();
  const newYorkTime = moment.tz("America/New_York").format();

  const fixPrice = (price) => {
    if (price) {
      return price.toFixed(2);
    } else {
      return price;
    }
  };

  const getPercentageChange = (n1, n2) => {
    const percentageChange = (num1, num2) => {
      return (num1 - num2) / ((num1 + num2) / 2);
    };

    if (newYorkTime >= marketsOpen && newYorkTime <= marketsClose) {
      return `${percentageChange(n1, n2).toFixed(4)}%`;
    }
  };

  const tickerArr = [
    "NFLX",
    "ROST",
    "MRNA",
    "KDP",
    "PEP",
    "ZM",
    "ABNB",
    "PYPL",
  ];

  useEffect(() => {
    setIsStockListLoading(true);

    api
      .getTickerPrice(tickerArr)
      .then((data) => {
        setPrices(data);
        setIsStockListLoading(false);
      })
      .catch((err) => console.log(err));

    api
      .getStockListNasdaq()
      .then((data) => {
        const stocksFiltered = data.filter((stock) => {
          if (tickerArr.includes(stock.symbol)) {
            return stock;
          }
        });
        setStocksList(stocksFiltered);
        setIsStockListLoading(false);
      })
      .catch((err) => console.log(err));

    const interval = setInterval(() => {
      api.getTickerPrice(tickerArr).then((response) => {
        setPrevious(prices);
        setPrices(response);
      });
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  if (IsStockListLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Box sx={{}}>
        {stocksList.map((stock) => {
          return (
            <Card
              key={stock.symbol}
              id="stock-list"
              sx={{
                mb: "20px",
                padding: "30px",
                borderRadius: "3%",
              }}
              elevation={10}
            >
              <Link to={`/stock/${stock.symbol}`}>
                <h5>
                  {stock.companyName} ({stock.symbol})
                </h5>
              </Link>

              <div
                className="Ticker"
                key={stock.symbol}
                style={{
                  padding: "10px",
                  backgroundColor: "#E4E6F2",
                  borderRadius: "3%",
                }}
              >
                <h2 className="ticker">
                  {stock.symbol}
                  <span
                    className={
                      previous[stock.symbol]
                        ? previous[stock.symbol] <= prices[stock.symbol]
                          ? "positive-price"
                          : "negative-price"
                        : "ticker-price"
                    }
                  >
                    {fixPrice(prices[stock.symbol])}
                  </span>
                </h2>
                <p
                  className={
                    previous[stock.symbol]
                      ? previous[stock.symbol] <= prices[stock.symbol]
                        ? "positive-price"
                        : "negative-price"
                      : "ticker-price"
                  }
                  style={{ margin: "0px", fontSize: "1.3em" }}
                >
                  {getPercentageChange(
                    prices[stock.symbol],
                    previous[stock.symbol]
                  )}{" "}
                </p>
              </div>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default StocksList;
