import { Typography, CircularProgress, Box } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { getTickerPrice } from "../utils/api";

const useStyles = makeStyles((theme) => ({
  ticker: {
    display: "flex",
    justifyContent: "space-between",
    overflowX: "auto",
    whiteSpace: "nowrap",
    animation: "$scroll 60s linear infinite",
  },
  "@keyframes scroll": {
    "0%": {
      transform: "translateX(100%)",
    },
    "100%": {
      transform: "translateX(-100%)",
    },
  },
  tickerItem: {
    display: "inline-block",
    padding: theme.spacing(2),
  },
}));

const TickerList = () => {
  const fixPrice = (price) => {
    if (price) {
      return price.toFixed(2);
    } else {
      return price;
    }
  };
  const classes = useStyles();
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
  ];

  const [prices, setPrices] = useState({});
  const [previous, setPrevious] = useState(null);
  const [IsTickerLoading, setIsTickerLoading] = useState(true);

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
  }, [prices]);

  if (IsTickerLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Typography
      component="div"
      variant="body2"
      color="info"
      className={classes.ticker}
    >
      {tickerArray.map((ticker) => (
        <div className="Ticker" key={ticker} style={{ marginRight: "20px" }}>
          <h2 className="ticker-price">{`${ticker} ${fixPrice(
            prices[ticker]
          )}`}</h2>
        </div>
      ))}
    </Typography>
  );
};

export default TickerList;
