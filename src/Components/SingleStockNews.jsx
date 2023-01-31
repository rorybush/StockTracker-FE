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
  CircularProgress
} from "@mui/material";
import moment from "moment";

const SingleStockNews = ({ symbol }) => {
  const [singleStockNews, setSingleStockNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getSingleStockNews(symbol)
      .then((data) => {
        setSingleStockNews(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "35px 20px",
        width: { lg: 500, md: 450, sm: 400, xs: 350 },
        mr: { lg: 8, md: 7, sm: 6 },
      }}
    >
      {<p style={{ color: "#0288D1" }}>Top Stories</p>}
      <Grid container spacing={3}>
        {singleStockNews.length > 0 &&
          singleStockNews.map((news) => (
            <Grid item key={news.uuid}>
              <Card sx={{ display: "flex" }}>
                <CardActionArea href={news.link} target="_blank">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: { lg: 500, md: 450, sm: 400, xs: 350 },
                      height: { lg: 100, md: 100, sm: 100, xs: 100 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: { lg: 40, md: 40, sm: 45, xs: 60 },
                        width: { lg: 400, md: 350, sm: 300, xs: 250 },
                      }}
                    >
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          mr: 1,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 11 }}
                          color="text.secondary"
                        >
                          {news.publisher}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 10 }}
                          color="text.secondary"
                        >
                          {moment(news.providerPublishTime * 1000).fromNow()}
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 12 }}>
                        {news.title}
                      </Typography>

                      <Typography sx={{ fontSize: 10 }} color="text.secondary">
                        Link to news article
                      </Typography>
                    </Box>
                    {news.hasOwnProperty("thumbnail") ? (
                      <CardMedia
                        component="img"
                        image={news.thumbnail.resolutions[0].url}
                        sx={{
                          // paddingTop: "56.25%",
                          height: 60,
                          width: 60,
                          borderRadius: "10%",
                          ml: 2,
                        }}
                      />
                    ) : (
                      // image={`https://source.unsplash.com/random?${article.title}`}
                      <CardMedia
                        component="img"
                        image={`https://source.unsplash.com/random?${news.publisher} `}
                        sx={{
                          // paddingTop: "56.25%",
                          height: 60,
                          width: 60,
                          borderRadius: "10%",
                          ml: 2,
                          mb: 1,
                        }}
                      />
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default SingleStockNews;
