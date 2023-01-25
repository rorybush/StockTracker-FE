import { Container, Grid, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Container sx={{mt:10}}>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam ea maxime deleniti reprehenderit dolor animi, excepturi iure odio, atque aperiam delectus sapiente veritatis consequatur adipisci quia maiores numquam earum aliquid.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home