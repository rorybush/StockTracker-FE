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
    setIsLoading(true)
    api.getStockNews().then((data) => {
      setStockNews(data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err)
    })
  }, []);

  if(isLoading) return <p>Loading...</p>

  return (
    <Container maxWidth="lg" sx={{ padding: "35px 20px", margin:"0 auto" }}>
      <Grid container spacing={3} >
        {stockNews.map((news) => (
          <Grid item key={news.uuid} >
            <Card sx={{ display: "flex"}}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width:550,
                  height:400              
                }}
              >
                 {news.hasOwnProperty("thumbnail") ? (
                  <CardMedia
                    component="img"
                    image={news.thumbnail.resolutions[0].url}
                    sx={{
                      // paddingTop: "56.25%",
                      height: 330,
                      width: 500,
                      borderRadius: "2%",
                      mb: 1,
                    }}
                  />
                ) : (
                  // image={`https://source.unsplash.com/random?${article.title}`}
                  <CardMedia
                    component="img"
                    image={`https://source.unsplash.com/random?${news.publisher} `}
                    sx={{
                      // paddingTop: "56.25%",
                      height: 330,
                      width: 500,
                      borderRadius: "2%",
                      mb: 1,
                    }}
                  />
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 50,
                    width: 500,
                  }}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mr: 1,
                      ml:1,
                    }}
                  >
                    <Typography sx={{fontSize:12}} color="text.secondary">
                      {news.publisher}
                    </Typography>
                    <Typography sx={{fontSize:11}} color="text.secondary">
                      {moment(news.providerPublishTime * 1000).fromNow()}
                    </Typography>
                  </Stack>
                  <Typography sx={{fontSize:14}}>{news.title}</Typography>
                  <CardActionArea href={news.link} target="_blank">
                    <Typography sx={{fontSize:11}} color="text.secondary">
                      Link to news article
                    </Typography>
                  </CardActionArea>
                </Box>
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StockNews;

