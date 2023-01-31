import React from "react";
import AboutSection from "./AboutSection";
import SingleStockNews from "./SingleStockNews";
import StockGraph from "./StockGraph";
import Chat from "./Chat";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, Stack } from "@mui/material";
import StockCalendar from "./StockCalendar";
import "./singleStock.css";

const SingleStock = () => {
  const { symbol } = useParams();

  return (
    <section className="about-section_container">
      <div className="graph">
        <StockGraph />
      </div>
      <div className="about">
        <AboutSection symbol={symbol} />
      </div>
      <div className="news">
        <SingleStockNews symbol={symbol} />
      </div>
      <div className="calender">
        <StockCalendar ticker={symbol} />
      </div>
    </section>
  );
};

export default SingleStock;

{
  /*     <Container maxWidth="lg" sx={{ padding: "35px 20px" }}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={8}>
            <StockGraph />
          </Grid>
          <Grid item xs={4}>
          <AboutSection symbol={symbol} />    
          </Grid>
          <Grid item xs={6}>
          <SingleStockNews symbol={symbol} />
          </Grid>
          <Grid item xs={6}>
            <StockCalendar ticker={symbol} />
          </Grid>
        </Grid>
      </Grid>
    </Container> */
}
