import React, { useEffect, useState } from "react";
import * as api from "../api";

function PortfolioStocksTest() {
  const [Uid, setUid] = useState("q5B0Tm2BoQekynXWR7q6WtlikfI2");
  const [Stocks, setStocks] = useState([]);
  useEffect(() => {
    api
      .getPortfolioStocks(Uid)
      .then((data) => {
        setStocks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div></div>;
}

export default PortfolioStocksTest;
