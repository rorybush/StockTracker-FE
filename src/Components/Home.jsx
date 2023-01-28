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
          <TickerList />
          {/* <StockNews/> */}
          {/* <StocksList /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
