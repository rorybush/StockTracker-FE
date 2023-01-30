import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {Link} from 'react-router-dom'

const AboutSection = ({ symbol }) => {
  console.log(symbol, "SYMBOL");
  const [stock, setStock] = useState({});

  useEffect(() => {
    api.getSingleStock("msft").then((stockData) => {
      setStock(stockData);
    });
  }, []);
  return (
    <Container spacing={2}>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          maxWidth: 400,
          width: "100%",
          mt: 2,
          mb: 4,
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
        >
          <ListItem divider disableGutters>
            <ListItemText>{stock.companyName}</ListItemText>
            <ImageList sx={{ width: 70, height: 35, textAlign: "right" }}>
              <ImageListItem>
                <img src={stock.logo} alt='Company Logo'/>
              </ImageListItem>
            </ImageList>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>PREVIOUS CLOSE</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {stock.previousClose}
            </ListItemText>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>DAY RANGE</ListItemText>
            <ListItemText inset sx={{ textAlign: "right" }}>
              {Math.round((stock.dayLow + Number.EPSILON) * 100) / 100}
              {" - "}
              {Math.round((stock.dayHigh + Number.EPSILON) * 100) / 100}
            </ListItemText>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>YEAR RANGE</ListItemText>
            <ListItemText inset sx={{ textAlign: "right" }}>
              {Math.round((stock.yearLow + Number.EPSILON) * 100) / 100}
              {" - "}
              {Math.round((stock.yearHigh + Number.EPSILON) * 100) / 100}
            </ListItemText>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>MARKET CAP</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {stock.marketCap}
            </ListItemText>
          </ListItem>
        </List>
      </Box>

      {/* ABOUTSECTION */}

      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          maxWidth: 400,
          width: "100%",
          mt: 2,
          mb: 2,
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
        >
          <ListItem divider disableGutters>
            <ListItemText
              primary="ABOUT"
              secondary={stock.summary}
            ></ListItemText>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>Headquarter</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {stock.headquarter}
            </ListItemText>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>No. of employees</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {stock.employees}
            </ListItemText>
          </ListItem>
          <ListItem divider disableGutters>
            <ListItemText>Website</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              <Link component="a" href={stock.website} target="_blank">{stock.website}</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default AboutSection;

/*
  <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'><p>Company name</p> <p>{stock.companyName}</p></Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Sector{stock.sector}</Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'><p>Website</p> <p>{stock.website}</p></Typography>
        </CardContent>
        
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'><p>Last price</p> <p>{stock.lastPrice}</p></Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Market cap {stock.marketCap}</Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Year range $ {stock.yearLow} - {stock.yearHigh}</Typography>
        </CardContent>
        <CardContent align="center" sx={{borderBottom:"1px solid grey"}}>
            <Typography color='textSecondary' variant='subtitle2'>Day range {stock.dayLow} - {stock.dayHigh}</Typography>
        </CardContent>


*/
