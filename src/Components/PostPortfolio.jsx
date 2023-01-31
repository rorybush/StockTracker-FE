import React from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import { useState } from "react";

function PostPortfolio({ Portfolio, setPortfolio }) {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  const [NewStock, setNewStock] = useState({
    name: "",
    date: "",
    quantity: "",
    price: "",
  });
  //   auth.currentUser.uid;

  const postNewStock = (e) => {
    e.preventDefault();

    setPortfolio((currStocks) => {
      return [NewStock, ...currStocks];
    });

    api.postPortfolioStock(
      uid,
      NewStock.name.toUpperCase(),
      NewStock.date,
      NewStock.quantity,
      NewStock.price
    );
  };

  return (
    <div>
      {uid && (
        <form onSubmit={postNewStock}>
          <label>Stock Name </label>
          <input
            type="text"
            name="stockName"
            required
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                name: e.target.value.toUpperCase(),
              });
            }}
          />

          <label>Quantity </label>
          <input
            type="number"
            name="quantity"
            required
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                quantity: e.target.value,
              });
            }}
          />

          <label>Purchase Price </label>
          <input
            type="number"
            step="0.01"
            name="price"
            required
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                price: e.target.value,
              });
            }}
          />

          <label>Purchase Date </label>
          <input
            type="date"
            name="date"
            required
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                date: e.target.value,
              });
            }}
          />

          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default PostPortfolio;
