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



const SingleStockNews = ({symbol}) => {

    const [singleStockNews, setSingleStockNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true)
        api.getSingleStockNews(symbol).then((data) => {
            setSingleStockNews(data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })
    },[])

    if(isLoading) return <p>Loading...</p>
    
   return (
    
    <Container maxWidth="md" sx={{ padding: "35px 20px", width: 320 }}>
      <Grid container spacing={0.5}>
        {singleStockNews.length > 0 && singleStockNews.map((news) => (
          <Grid item key={news.uuid}>
            <Card sx={{ display: "flex" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width:320
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 40,
                    width: 320,
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
                    <Typography sx={{fontSize:9}} color="text.secondary">
                      {news.publisher}
                    </Typography>
                    <Typography sx={{fontSize:8}} color="text.secondary">
                      {moment(news.providerPublishTime * 1000).fromNow()}
                    </Typography>
                  </Stack>
                  <Typography sx={{fontSize:10}}>{news.title}</Typography>
                  <CardActionArea href={news.link} target="_blank">
                    <Typography sx={{fontSize:8}} color="text.secondary">
                      Link to news article
                    </Typography>
                  </CardActionArea>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SingleStockNews