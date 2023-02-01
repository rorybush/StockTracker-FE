import { Typography, LinearProgress, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { getTickerPrice } from "../utils/api";

const useStyles = makeStyles((theme) => ({
  tickerContainer: {
    width: "100%",
    overflow: "hidden",
    background: "#F2F2F2",
    borderBottom: "1px solid grey",
  },
  ticker: {
    display: "flex",
    justifyContent: "space-between",
    whiteSpace: "nowrap",
    animation: "$scroll 30s linear infinite",
    "&:hover": {
      animationPlayState: "paused",
    },
  },

  "@keyframes scroll": {
    "0%": {
      transform: "translate(0%)",
    },
    "100%": {
      transform: `translate(-100%, 0)`,
    },
  },
  tickerItem: {
    display: "inline-block",
    padding: theme.spacing(2),
  },
}));
const TickerList = () => {
  const classes = useStyles();

  const fixPrice = (price) => {
    if (price) {
      return price.toFixed(2);
    } else {
      return price;
    }
  };

  const percentageChange = (n1, n2) => {
    return (n1 - n2) / ((n1 + n2) / 2);
  };

  const tickerArray = [
    "AAPL",
    "TSLA",
    "MSFT",
    "AMZN",
    "META",
    "GOOG",
    "BABA",
    "GM",
    "F",
    "WMT",
    "JPM",
    "HSBC",
    "GSK",
    "BHP",
    "AZN",
    "UL",
    "AAPL",
    "TSLA",
    "MSFT",
    "AMZN",
    "META",
    "GOOG",
    "BABA",
    "GM",
    "F",
    "WMT",
    "JPM",
    "HSBC",
    "GSK",
    "BHP",
    "AZN",
  ];

  const [prices, setPrices] = useState({});
  const [previous, setPrevious] = useState(null);
  const [IsTickerLoading, setIsTickerLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    getTickerPrice(tickerArray).then((response) => {
      setIsTickerLoading(false);
      setPrices(response);
    });

    const interval = setInterval(() => {
      getTickerPrice(tickerArray).then((response) => {
        setPrevious(prices);
        setPrices(response);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [prices, previous]);

  if (IsTickerLoading)
    return (
      <Box sx={{ width: "70%", m: "20px auto 50px" }}>
        <LinearProgress color="info" />
      </Box>
    );

  return (
    <div className={classes.tickerContainer}>
      <Typography
        component="div"
        variant="body2"
        color="info"
        className={classes.ticker}
      >
        {tickerArray.map((ticker, i) => (
          <div
            className="Ticker"
            key={`${ticker}${i}`}
            style={{ padding: "10px", borderRight: "1px solid grey" }}
          >
            <h2 className="ticker">
              {ticker}
              <span
                className={
                  previous[ticker]
                    ? previous[ticker] <= prices[ticker]
                      ? "positive-price"
                      : "negative-price"
                    : "ticker-price"
                }
              >
                {fixPrice(prices[ticker])}
              </span>
            </h2>
            <p
              className={
                previous[ticker]
                  ? previous[ticker] <= prices[ticker]
                    ? "positive-price"
                    : "negative-price"
                  : "ticker-price"
              }
              style={{ margin: "0px", fontSize: "1.3em" }}
            >
              {percentageChange(prices[ticker], previous[ticker]).toFixed(4)} %
            </p>
          </div>
        ))}
      </Typography>
    </div>
  );
};

export default TickerList;
