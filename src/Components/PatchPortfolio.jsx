import React, { useState } from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";

function PatchPortfolio({ stockName, date, price, quantity, setPortfolio }) {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;

  const [UserEdit, setUserEdit] = useState({
    stockName: stockName,
    quantity: quantity,
    price: price,
    date: date,
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPortfolio((curPortfolio) => {
      return curPortfolio.map((stock) => {
        if (stock.name === stockName) {
          return {
            ...stock,
            name: UserEdit.stockName,
            quantity: UserEdit.quantity,
            price: UserEdit.price,
            date: UserEdit.date,
          };
        }
        return stock;
      });
    });
    api.editStock(
      uid,
      UserEdit.stockName,
      UserEdit.date,
      UserEdit.quantity,
      UserEdit.price
    );
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <label>Stock Name </label>
        <input
          type="text"
          name="stockName"
          defaultValue={stockName}
          onChange={(e) =>
            setUserEdit({
              ...UserEdit,
              stockName: e.target.value,
            })
          }
          disabled
        />

        <label>Quantity </label>
        <input
          type="number"
          name="quantity"
          defaultValue={quantity}
          onChange={(e) => {
            setUserEdit({
              ...UserEdit,
              quantity: e.target.value,
            });
          }}
        />

        <label>Purchase Price </label>
        <input
          type="number"
          name="price"
          step="0.01"
          defaultValue={price}
          onChange={(e) => {
            setUserEdit({
              ...UserEdit,
              price: e.target.value,
            });
          }}
        />

        <label>Purchase Date </label>
        <input
          type="date"
          name="date"
          defaultValue={date}
          onChange={(e) => {
            setUserEdit({
              ...UserEdit,
              date: e.target.value,
            });
          }}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default PatchPortfolio;
