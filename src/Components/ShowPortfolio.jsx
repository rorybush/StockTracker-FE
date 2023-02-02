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
  CircularProgress,
} from "@mui/material";
import PortfolioProfitLoss from "./PortfolioProfitLoss";

function ShowPortfolio() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };

  const auth = getAuth();
  const uid = auth.currentUser.uid;

  const [Portfolio, setPortfolio] = useState([]);
  const [showEditStock, setShowEditStock] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [PortfolioError, setPortoflioError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .getPortfolioStocks(uid)
      .then((data) => {
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
      })
      .catch((err) => {
        setIsLoading(false);
        setPortoflioError(err.response.data.message);
      });
      // eslint-disable-next-line
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

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  // if (uid === null) return <p>Please login</p>;

  return (
    <Container maxWidth="lg" className="portfolio">
      {PortfolioError && <p>No Stocks in Portfolio</p>}
      <PortfolioProfitLoss className="progress" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack direction='row'>
        <Popup
          trigger={
            <Button
              variant="contained"
              className="add-investment"
              style={{ height:45, width: 450, margin:"20px auto" }}
            >
              <AddCircleIcon style={{ marginRight: "8px" }} /> Add Investment
            </Button>
          }
          position="right center"
        >
          <PostPortfolio setPortfolio={setPortfolio} />
        </Popup>
        <Button
          onClick={deletePortfolio}
          variant="outlined"
          color="error"
          sx={{ height:45, width: 450, margin:"20px auto" }}
        >
          DELETE PORTFOLIO
        </Button>
        </Stack>
        <Stack direction="row" spacing={3} justifyContent="space-around">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper
                elevation={10}
                sx={paperStyle}
                style={{
                  margin: "-10px",
                  marginTop: "20px",
                  width: "100%",
                  marginBottom: "25px",
                }}
              >
                {Portfolio.map((stock) => {
                  return (
                    <List key={stock.name}>
                      <ListItem disableGutters>
                        <ListItemText disableTypography>
                          Name: {stock.name.toUpperCase()}
                        </ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText disableTypography>
                          Date: {stock.date}
                        </ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText disableTypography>
                          Price: £{stock.price}
                        </ListItemText>
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText disableTypography>
                          Quantity: {stock.quantity}
                        </ListItemText>
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
      </Box>
    </Container>
  );
}

export default ShowPortfolio;
