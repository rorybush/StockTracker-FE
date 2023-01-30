import { Box, Stack } from "@mui/material";
import React from "react";
import StocksList from "./StocksList";
import StockNews from './StockNews'

const Home = () => {
  return (
    <Box>
      <Stack direction="row" spacing={3} justifyContent="space-around">
      <StocksList />
      <StockNews/>
      </Stack>
    </Box>
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