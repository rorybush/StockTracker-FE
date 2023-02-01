import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import * as api from "../utils/api";
import PostPortfolio from "./PostPortfolio";
import PatchPortfolio from "./PatchPortfolio";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Popup from "reactjs-popup";
import {
  Box,
  Stack,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import PortfolioProfitLoss from "./PortfolioProfitLoss";

function ShowPortfolio() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };

  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;
  const [Portfolio, setPortfolio] = useState([]);
  const [showEditStock, setShowEditStock] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getPortfolioStocks(uid).then((data) => {
      setIsLoading(false);
      const cleanStockData = data.map((stock) => {
        const stockKeys = Object.keys(stock)[0];
        const { date, name, price, quantity } = stock[stockKeys];
        return {
          name,
          date,
          price,
          quantity,
        };
      });
      setPortfolio(cleanStockData);
    });
  }, []);

  const deletePortfolio = (e) => {
    e.preventDefault();
    setPortfolio([]);
    api.deletePortfolio(uid);
  };

  const deleteStock = (e) => {
    e.preventDefault();
    const stockName = e.target.name;
    setPortfolio((curPortfolio) =>
      curPortfolio.filter((stock) => stock.name !== stockName)
    );
    api.deleteStock(uid, stockName);
  };

  const editStock = (e, stockName) => {
    e.preventDefault();
    setShowEditStock((curValue) => ({
      ...curValue,
      [stockName]: !curValue[stockName],
    }));
  };

  return (
    <Container maxWidth="lg" className="portfolio">
      <PortfolioProfitLoss className="progress" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Popup
          trigger={
            <Button
              variant="contained"
              className="add-investment"
              size="large"
              style={{ marginTop: "20px" }}
            >
              <AddCircleIcon style={{ marginRight: "8px" }} /> Add Investment
            </Button>
          }
          position="right center"
        >
          <PostPortfolio setPortfolio={setPortfolio} />
        </Popup>
        <Stack direction="row" spacing={3} justifyContent="space-around">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Paper
                elevation={10}
                sx={paperStyle}
                style={{
                  margin: "-10px",
                  marginTop: "20px",
                  fontFamily: "Roboto Mono",
                }}
              >
                {Portfolio.map((stock) => {
                  return (
                    <List key={stock.name}>
                      <ListItem disableGutters>
                        <ListItemText>
                          Name: {stock.name.toUpperCase()}
                        </ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText>Date: {stock.date}</ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText>Price: £{stock.price}</ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText>Quantity: {stock.quantity}</ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <Button
                          onClick={deleteStock}
                          name={stock.name}
                          variant="contained"
                          size="small"
                          sx={{ mr: 2 }}
                        >
                          DELETE STOCK
                        </Button>
                        <Button
                          onClick={(e) => editStock(e, stock.name)}
                          variant="contained"
                          size="small"
                        >
                          EDIT STOCK
                        </Button>
                      </ListItem>
                      <Divider sx={{ mt: 3 }}></Divider>
                      {showEditStock[stock.name] && (
                        <PatchPortfolio
                          stockName={stock.name}
                          date={stock.date}
                          price={stock.price}
                          quantity={stock.quantity}
                          setPortfolio={setPortfolio}
                        />
                      )}
                    </List>
                  );
                })}
              </Paper>
            </Grid>
          </Grid>
        </Stack>
        <Button
          onClick={deletePortfolio}
          variant="outlined"
          color="info"
          sx={{ width: 250, m: "0px auto 20px" }}
        >
          DELETE PORTFOLIO
        </Button>
      </Box>
    </Container>
  );
}

export default ShowPortfolio;

/*
<Box>
      <Stack direction='row' spacing={3} justifyContent="space-around">
      {isLoading && <p>Loading...</p>}
      <PostPortfolio />
      <Paper elevation={10} sx={{paperStyle}}>
        <List>
      {Portfolio.map((stock) => {
        return (
          <ListItem key={stock.name}>
            <ListItemText>Name: {stock.name.toUpperCase()}</ListItemText>
            <ListItemText>Date: {stock.date}</ListItemText>
            <ListItemText>Price: {stock.price}</ListItemText>
            <ListItemText>Quantity: {stock.quantity}</ListItemText>
            <Button onClick={deleteStock} variant='contained'>DELETE STOCK</Button>
            <Button onClick={(e) => editStock(e, stock.name)} variant='contained'>
              EDIT STOCK
            </Button>
            {showEditStock[stock.name] && (
              <PatchPortfolio
                stockName={stock.name}
                date={stock.date}
                price={stock.price}
                quantity={stock.quantity}
              />
            )}
          </ListItem>
        );
      })}
      </List>
      </Paper>
    <Box>
      <Stack direction="row" spacing={3} justifyContent="space-around">
        {isLoading && <p>Loading...</p>}
        <PostPortfolio setPortfolio={setPortfolio} />
        {Portfolio.map((stock) => {
          return (
            <ul key={stock.name}>
              <li>Name: {stock.name}</li>
              <li>Date: {stock.date}</li>
              <li>Price: {stock.price}</li>
              <li>Quantity: {stock.quantity}</li>
              <button onClick={deleteStock} name={stock.name}>
                DELETE STOCK
              </button>
              <button onClick={(e) => editStock(e, stock.name)}>
                EDIT STOCK
              </button>
              {showEditStock[stock.name] && (
                <PatchPortfolio
                  stockName={stock.name}
                  date={stock.date}
                  price={stock.price}
                  quantity={stock.quantity}
                  setPortfolio={setPortfolio}
                />
              )}
            </ul>
          );
        })}

        <button onClick={deletePortfolio}>DELETE PORTFOLIO</button>
      </Stack>
      <Button onClick={deletePortfolio} variant="outlined" color="info">DELETE PORTFOLIO</Button>
      
    </Box>


*/
