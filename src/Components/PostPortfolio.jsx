import React, { useState } from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import "./postPortfolio.css";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";

function PostPortfolio({ Portfolio, setPortfolio }) {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  const [NewStock, setNewStock] = useState({
    name: "",
    date: "",
    quantity: "",
    price: "",
  });

  const postNewStock = (e) => {
    e.preventDefault();
    console.log(e, "post function");
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
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Add stocks to your portfolio.
          </Typography>
          {uid && (
            <form onSubmit={postNewStock}>
              <TextField
                type="text"
                name="stockName"
                label="Stock Name"
                placeholder="Enter stock name"
                fullWidth
                required
                sx={textStyle}
                onChange={(e) => {
                  setNewStock({
                    ...NewStock,
                    name: e.target.value.toUpperCase(),
                  });
                }}
              />

              <TextField
                type="number"
                name="quantity"
                label="Quantity"
                required
                fullWidth
                placeholder="Enter quantity"
                sx={textStyle}
                onChange={(e) => {
                  setNewStock({
                    ...NewStock,
                    quantity: e.target.value,
                  });
                }}
              />

              <TextField
                type="number"
                step="0.01"
                name="price"
                label="Purchase Price"
                placeholder="Enter purchase price"
                fullWidth
                required
                sx={textStyle}
                onChange={(e) => {
                  setNewStock({
                    ...NewStock,
                    price: e.target.value,
                  });
                }}
              />

              <TextField
                type="date"
                name="date"
                required
                fullWidth
                sx={textStyle}
                onChange={(e) => {
                  setNewStock({
                    ...NewStock,
                    date: e.target.value,
                  });
                }}
              />

              <Button
                type="submit"
                sx={textStyle}
                fullWidth
                variant="contained"
              >
                {" "}
                Save
              </Button>
            </form>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default PostPortfolio;
