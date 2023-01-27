import React from "react";
import * as api from "../utils/api";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";

function PostPortfolio() {
  const { register, handleSubmit, errors } = useForm();
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;

  const postNewStock = (data) => {
    api.postPortfolioStock(
      uid,
      data.stockName,
      data.date,
      data.quantity,
      data.price
    );
  };

  return (
    <div>
      {uid && (
        <form onSubmit={handleSubmit(postNewStock)}>
          <label>Stock Name </label>
          <input type="text" {...register("stockName", { required: true })} />
          {/* {errors.name && <span>This field is required</span>} */}

          <label>Quantity </label>
          <input type="number" {...register("quantity", { required: true })} />
          {/* {errors.quantity && <span>This field is required</span>} */}

          <label>Purchase Price </label>
          <input type="number" {...register("price", { required: true })} />
          {/* {errors.price && <span>This field is required</span>} */}

          <label>Purchase Date </label>
          <input type="date" {...register("date", { required: true })} />
          {/* {errors.date && <span>This field is required</span>} */}

          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default PostPortfolio;
