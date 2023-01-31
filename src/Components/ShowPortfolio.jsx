//show portfolio

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import * as api from "../utils/api";
import PostPortfolio from "./PostPortfolio";
import PatchPortfolio from "./PatchPortfolio";
import {
  Box,
  Stack,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from "@mui/material";

function ShowPortfolio() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
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

  const deleteStock = (e) => {
    e.preventDefault();
    api.deleteStock(uid, e.target.value);
  };

  const editStock = (e, stockName) => {
    e.preventDefault();
    setShowEditStock((curValue) => ({
      ...curValue,
      [stockName]: !curValue[stockName],
    }));
  };

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing={3} justifyContent="space-around">
        {isLoading && <p>Loading...</p>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <PostPortfolio />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper elevation={10} sx={{ paperStyle }}>
              {Portfolio.map((stock) => {
                return (
                  <List key={stock.name}>
                    <ListItem divider disableGutters>
                      <ListItemText>
                        Name: {stock.name.toUpperCase()}
                      </ListItemText>
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemText>Date: {stock.date}</ListItemText>
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemText>Price: {stock.price}</ListItemText>
                    </ListItem>
                    <ListItem divider disableGutters>
                      <ListItemText>Quantity: {stock.quantity}</ListItemText>
                    </ListItem>
                    <ListItem divider disableGutters>
                      <Button onClick={deleteStock} variant="contained">
                        DELETE STOCK
                      </Button>
                      <Button
                        onClick={(e) => editStock(e, stock.name)}
                        variant="contained"
                      >
                        EDIT STOCK
                      </Button>
                    </ListItem>
                    {showEditStock[stock.name] && (
                      <PatchPortfolio
                        stockName={stock.name}
                        date={stock.date}
                        price={stock.price}
                        quantity={stock.quantity}
                      />
                    )}
                  </List>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Stack>
      <Button onClick={deletePortfolio} variant="outlined" color="info">
        DELETE PORTFOLIO
      </Button>
    </Container>
  );
}

export default ShowPortfolio;

/*
<Box>
      <Stack direction='row' spacing={3} justifyContent="space-around">
      {isLoading && <p>Loading...</p>}
      <PostPortfolio />
      <Paper elevation={10} sx={{paperStyle}}>
        <List>
      {Portfolio.map((stock) => {
        return (
          <ListItem key={stock.name}>
            <ListItemText>Name: {stock.name.toUpperCase()}</ListItemText>
            <ListItemText>Date: {stock.date}</ListItemText>
            <ListItemText>Price: {stock.price}</ListItemText>
            <ListItemText>Quantity: {stock.quantity}</ListItemText>
            <Button onClick={deleteStock} variant='contained'>DELETE STOCK</Button>
            <Button onClick={(e) => editStock(e, stock.name)} variant='contained'>
              EDIT STOCK
            </Button>
            {showEditStock[stock.name] && (
              <PatchPortfolio
                stockName={stock.name}
                date={stock.date}
                price={stock.price}
                quantity={stock.quantity}
              />
            )}
          </ListItem>
        );
      })}
      </List>
      </Paper>
      </Stack>
      <Button onClick={deletePortfolio} variant="outlined" color="info">DELETE PORTFOLIO</Button>
      
    </Box>


*/
