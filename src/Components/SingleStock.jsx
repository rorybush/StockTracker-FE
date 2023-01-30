<<<<<<< HEAD
import React from "react";
import AboutSection from "./AboutSection";
import SingleStockNews from "./SingleStockNews";
import StockGraph from "./StockGraph";
import { useParams } from "react-router-dom";
import { Container, Grid } from '@mui/material';

const SingleStock = () => {
  const { symbol } = useParams();

  return (
    <Container maxWidth="lg" margin="0px auto">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
        {/* <StockGraph /> */}
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
=======
import React, { useEffect, useState } from "react";

const SingleStock = () => {
  const [singleStock, setSingleStock] = useState({});

  useEffect(() => {}, []);

  return <Container></Container>;
>>>>>>> 9bf2e3a8e8cfed5284899cb960e373cd921e837c
};

export default SingleStock;
