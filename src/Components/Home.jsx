import { Container, Grid } from "@mui/material";
import React from "react";
import StocksList from "./StocksList";
import StockNews from "./StockNews";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "35px 20px" }}>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} container>
          <Grid item xs={12} md={4} sx={{ mb: 10 }}>
            <StocksList />
          </Grid>
          <Grid item xs={12} md={8}>
            <StockNews />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
