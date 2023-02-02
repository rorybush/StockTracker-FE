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
  CircularProgress,
} from "@mui/material";
import moment from "moment";

const StockNews = () => {
  const [stockNews, setStockNews] = useState([]);
  const [IsStockNewsLoading, setIsStockNewsLoading] = useState(false);
  const [StockNewsError, setStockNewsError] = useState("");

  useEffect(() => {
    setIsStockNewsLoading(true);
    api
      .getStockNews()
      .then((data) => {
        if (Array.isArray(data) && data.length >= 1) {
          setStockNews(data);
        } else if (typeof data === "string") {
          setStockNewsError(data);
        }
        setIsStockNewsLoading(false);
      })
      .catch((err) => {
        setStockNewsError(err);
      });
  }, []);

  if (IsStockNewsLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ padding: "0px 20px", width: 500 }}>
      <Grid container spacing={0.5}>
        {<p style={{ color: "#0288D1" }}>Latest news</p>}
        {!(Array.isArray(stockNews) && stockNews.length >= 1) && (
          <p>{StockNewsError}</p>
        )}
        {stockNews &&
          stockNews.map((news) => (
            <Grid item key={news.uuid} xs={12}>
              <Card sx={{ display: "flex", mr: 2 }}>
                <CardActionArea href={news.link} target="_blank">
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: 500,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: 40,
                        width: 330,
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

export default StockNews;

