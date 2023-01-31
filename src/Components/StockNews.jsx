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

  console.log(stockNews);

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

// if(isLoading) return (
//   <Container
//   maxWidth="lg"
//   sx={{
//     padding: "35px 20px",
//     marginLeft: "50vw"
//   }}
// >
//   <Stack
//     direction="column"
//     justifyContent="center"
//     alignItems="center"
//     spacing={2}
//   >
//     <Grid container spacing={4}>
//       <Card>
//         Loading...
//       </Card>
//       </Grid>
//       </Stack>
//       </Container>
// )
// return (
//   <Container
//     maxWidth="lg"
//     sx={{
//       padding: "35px 20px",
//       marginTop: 10,
//     }}
//   >
//     <Stack
//       direction="column"
//       justifyContent="center"
//       alignItems="center"
//       spacing={2}
//     >
//       <Grid container spacing={4}>
//         {stockNews.map((news) => (
//           <Grid item key={news.uuid} xs={12} sm={12} md={4} lg={3}>
//             <Card>
//               <Stack
//                 direction="column"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 {news.hasOwnProperty("thumbnail") && (
//                   <CardMedia
//                     component="img"
//                     image={news.thumbnail.resolutions[0].url}
//                     // title={news.title}
//                     sx={{
//                       paddingTop: "56.25%",
//                     }}
//                   />
//                 )}
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {news.title}
//                   </Typography>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "flex-start",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         flexDirection: "row",
//                         width: "90vw",
//                       }}
//                     >
//                       <Typography color="textSecondary" variant="subtitle">
//                         {news.publisher}
//                       </Typography>
//                       <Typography color="textSecondary" variant="subtitle">
//                         {moment(news.providerPublishTime * 1000).fromNow()}
//                       </Typography>
//                     </Box>

//                     <CardActionArea href={news.link} target="_blank">
//                       {news.link}
//                     </CardActionArea>
//                   </Box>
//                 </CardContent>
//               </Stack>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Stack>
//   </Container>
// );
