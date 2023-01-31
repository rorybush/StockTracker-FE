import React from "react";
import AboutSection from "./AboutSection";
import SingleStockNews from "./SingleStockNews";
import StockGraph from "./StockGraph";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Stack } from "@mui/material";

const SingleStock = () => {
  const { symbol } = useParams();

  return (
    <Container maxWidth="lg" sx={{ padding: "35px 20px" }}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={8}>
            <StockGraph />
          </Grid>
          <Grid item xs={4}>
            <SingleStockNews symbol={symbol} />
          </Grid>
          <Grid item xs={6}>
            <AboutSection symbol={symbol} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleStock;

{
  /* <Container maxWidth="lg" sx={{ padding: "35px 20px" }}>
<Stack
  direction="column"
  justifyContent="center"
  spacing={2}
>
  <StockGraph />
  <SingleStockNews symbol={symbol} />
</Stack>

<Stack
  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
>
  <AboutSection symbol={symbol} />
</Stack>
</Container> */
}
