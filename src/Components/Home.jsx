import { Container, Grid } from '@mui/material'
import React from 'react'
// import StockNews from './StockNews'

const Home = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item>
        {/* <StockNews/> */}
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem vitae ea culpa quibusdam consequuntur quas hic velit reprehenderit recusandae nobis exercitationem ad nam, minima possimus similique voluptatibus repellat eum nihil.</p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home

{/* <Container
    maxWidth="lg"
    sx={{
      padding: "35px 20px",
      marginTop: 10,
    }}
  >
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid container spacing={4}>
        {stockNews.map((news) => (
          <Grid item key={news.uuid} xs={12} sm={12} md={4} lg={3}>
            <Card>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                {news.hasOwnProperty("thumbnail") && (
                  <CardMedia
                    component="img"
                    image={news.thumbnail.resolutions[0].url}
                    // title={news.title}
                    sx={{
                      paddingTop: "56.25%",
                    }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {news.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",                       
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "90vw",
                      }}
                    >
                      <Typography color="textSecondary" variant="subtitle">
                        {news.publisher}
                      </Typography>
                      <Typography color="textSecondary" variant="subtitle">
                        {moment(news.providerPublishTime * 1000).fromNow()}
                      </Typography>
                    </Box>

                    <CardActionArea href={news.link} target="_blank">
                      {news.link}
                    </CardActionArea>
                  </Box>
                </CardContent>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  </Container> */}