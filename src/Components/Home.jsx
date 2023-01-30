import { Container, Grid } from "@mui/material";
import React from "react";
import StocksList from "./StocksList";
import TickerList from "./TickerList";
// import StockNews from './StockNews'

const Home = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item>
<<<<<<< HEAD
          <p>hey</p>
        {/* <StockNews/> */}
        <StocksList/>
=======
          <TickerList />
          {/* <StockNews/> */}
          {/* <StocksList /> */}
>>>>>>> 9bf2e3a8e8cfed5284899cb960e373cd921e837c
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
