import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import {
  Container,
  Box,
  Stack,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";

const StockNews = () => {
  const [stockNews, setStockNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getStockNews()
      .then((data) => {
        setStockNews(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: "35px 20px", margin: "0 auto"}}
    >
      <Grid container spacing={3}>
        {stockNews.map((news) => (
          <Grid item key={news.uuid} xs={12} sm={6} md={4} >
            <Card sx={{ display: "flex"}}>
              <CardActionArea href={news.link} target="_blank">
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 340,
                    height: 380
                  }}
                >
                  {news.hasOwnProperty("thumbnail") ? (
                    <CardMedia
                      component="img"
                      image={news.thumbnail.resolutions[0].url}
                      sx={{
                        // paddingTop: "56.25%",
                        width: 315,
                        height: 250,
                        borderRadius: "2%",
                        mb: 1,
                      }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      image={`https://source.unsplash.com/random?${news.publisher}`}
                      sx={{
                        width: 315,
                        height: 250,
                        borderRadius: "2%",
                        mb: 1,
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: 325,
                      height: 30,
                    }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        mr: 1,
                        ml: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        {news.publisher}
                      </Typography>
                      <Typography sx={{ fontSize: 11 }} color="text.secondary">
                        {moment(news.providerPublishTime * 1000).fromNow()}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 14 }}>{news.title}</Typography>

                    <Typography sx={{ fontSize: 11 }} color="text.secondary">
                      Link to news article
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StockNews;
