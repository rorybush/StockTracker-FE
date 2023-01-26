import { Container, Grid } from '@mui/material'
import React from 'react'
import StockNews from './StockNews'

const Home = () => {
  return (
    <Container sx={{mt:10}}>
      <Grid container spacing={2}>
        <Grid item>
        <StockNews/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home