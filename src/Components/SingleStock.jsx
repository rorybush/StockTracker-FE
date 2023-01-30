import React from "react";
import AboutSection from "./AboutSection";
import SingleStockNews from "./SingleStockNews";
import StockGraph from "./StockGraph";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";

const SingleStock = () => {
  const { symbol } = useParams();

  return (
    <Container maxWidth="lg" margin="0px auto">
      <Grid container spacing={1} sx={{display:"flex", justifyContent:"space-between"}}> 
        <Grid item xs={12} sm={6}>
          <StockGraph />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AboutSection symbol={symbol} />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          {/* <SingleStockNews symbol={symbol} /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <AboutSection symbol={symbol} /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleStock;
