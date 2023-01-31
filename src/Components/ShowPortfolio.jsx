import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import * as api from "../utils/api";
import PostPortfolio from "./PostPortfolio";
import PatchPortfolio from "./PatchPortfolio";
import { Box, Stack } from "@mui/material";

function ShowPortfolio() {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;
  const [Portfolio, setPortfolio] = useState([]);
  const [showEditStock, setShowEditStock] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getPortfolioStocks(uid).then((data) => {
      setIsLoading(false);
      const cleanStockData = data.map((stock) => {
        const stockKeys = Object.keys(stock)[0];
        const { date, name, price, quantity } = stock[stockKeys];
        return {
          name,
          date,
          price,
          quantity,
        };
      });
      setPortfolio(cleanStockData);
    });
  }, []);

  const deletePortfolio = (e) => {
    e.preventDefault();
    setPortfolio([]);
    api.deletePortfolio(uid);
  };

  const deleteStock = (e) => {
    e.preventDefault();
    const stockName = e.target.name;
    setPortfolio((curPortfolio) =>
      curPortfolio.filter((stock) => stock.name !== stockName)
    );
    api.deleteStock(uid, stockName);
  };

  const editStock = (e, stockName) => {
    e.preventDefault();
    setShowEditStock((curValue) => ({
      ...curValue,
      [stockName]: !curValue[stockName],
    }));
  };

  return (
    <Box>
      <Stack direction="row" spacing={3} justifyContent="space-around">
        {isLoading && <p>Loading...</p>}
        <PostPortfolio setPortfolio={setPortfolio} />
        {Portfolio.map((stock) => {
          return (
            <ul key={stock.name}>
              <li>Name: {stock.name}</li>
              <li>Date: {stock.date}</li>
              <li>Price: {stock.price}</li>
              <li>Quantity: {stock.quantity}</li>
              <button onClick={deleteStock} name={stock.name}>
                DELETE STOCK
              </button>
              <button onClick={(e) => editStock(e, stock.name)}>
                EDIT STOCK
              </button>
              {showEditStock[stock.name] && (
                <PatchPortfolio
                  stockName={stock.name}
                  date={stock.date}
                  price={stock.price}
                  quantity={stock.quantity}
                  setPortfolio={setPortfolio}
                />
              )}
            </ul>
          );
        })}

        <button onClick={deletePortfolio}>DELETE PORTFOLIO</button>
      </Stack>
    </Box>
  );
}

export default ShowPortfolio;
