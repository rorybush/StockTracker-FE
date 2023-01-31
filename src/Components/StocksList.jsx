import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import { Link } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import "./stocksList.css";

const StocksList = () => {
  const [stocksList, setStocksList] = useState([]);
  const [IsStockListLoading, setIsStockListLoading] = useState(false);

  useEffect(() => {
    setIsStockListLoading(true);
    api
      .getStockListNasdaq()
      .then((data) => {
        setStocksList(data);
        setIsStockListLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (IsStockListLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Box>
        {stocksList.map((stock) => {
          return (
            <li key={stock.symbol} id="stock-list">
              <Link to={`/stock/${stock.symbol}`}>
                <h5>
                  {stock.companyName} ({stock.symbol})
                </h5>
              </Link>
            </li>
          );
        })}
      </Box>
    </div>
  );
};

export default StocksList;
