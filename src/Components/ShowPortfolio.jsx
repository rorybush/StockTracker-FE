import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import * as api from "../utils/api";
import PostPortfolio from "./PostPortfolio";

function ShowPortfolio() {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;
  const [Portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    api.getPortfolioStocks(uid).then((data) => {
      console.log(data);
      const cleanStockData = data.map((stock) => {
        const stockName = Object.keys(stock)[0];
        const { date, name, price, quantity } = stock[stockName];
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
    api.deletePortfolio(uid);
  };
  //add confirmation to ensure they want to delete?
  const deleteStock = (e) => {
    e.preventDefault();
    api.deleteStock(uid, e.target.value);
  };

  const editStock = (e) => {
    e.preventDefault();
    api.deleteStock(uid, e.target.value);
  };

  return (
    <div>
      <PostPortfolio/>
      {Portfolio.map((stock) => {
        return (
          <ul key={stock.name}>
            <li>Name: {stock.name}</li>
            <li>Date: {stock.date}</li>
            <li>Price: {stock.price}</li>
            <li>Quantity: {stock.quantity}</li>
            <button onClick={deleteStock} value={stock.name}>
              DELETE STOCK
            </button>
            <button onClick={editStock} value={stock.name}>
              EDIT STOCK
            </button>
          </ul>
        );
      })}
      <button onClick={deletePortfolio}>DELETE PORTFOLIO</button>
    </div>
  );
}

export default ShowPortfolio;
