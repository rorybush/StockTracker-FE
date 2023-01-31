import { Container, Grid } from "@mui/material";
import React from "react";
import StocksList from "./StocksList";
import StockNews from "./StockNews";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ padding: "35px 20px" }}>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12} container>
          <Grid item xs={12} md={4}>
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

// <Container maxWidth="lg" sx={{ padding: "35px 20px", margin:"0 auto" }}>
//   <Grid container spacing={2} sx={{display:"flex", justifyContent:"row"}}>
//     <Grid item xs={12} sm={12} md={6} lg={6}>
//       <StocksList />
//       <StockNews/>
//     </Grid>
//   </Grid>
// </Container>
