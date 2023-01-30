import React from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";

function PostPortfolio() {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;

  const postNewStock = (e) => {
    e.preventDefault();
    const stockName = e.target[0].value;
    const quantity = e.target[2].value;
    const price = e.target[3].value;
    const date = e.target[4].value;
    api.postPortfolioStock(uid, stockName, date, quantity, price);
  };

  return (
    <div>
      {uid && (
        <form onSubmit={postNewStock}>
          <label>Stock Name </label>
          <input type="text" name="stockName" required />

          <label>Quantity </label>
          <input type="number" name="quantity" required />

          <label>Purchase Price </label>
          <input type="number" step="0.01" name="price" required />

          <label>Purchase Date </label>
          <input type="date" name="date" required />

          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default PostPortfolio;
