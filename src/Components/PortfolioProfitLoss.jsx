import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loss: {
    color: "rgb(145, 7, 7);",
  },

  profit: {
    color: "rgb(106, 151, 32);",
  },
}));

function PortfolioProfitLoss() {
  const classes = useStyles();

  const auth = getAuth();
  const uid = auth.currentUser.uid;

  const [isLoading, setIsLoading] = useState(false);
  const [PortfolioData, setPortfolioData] = useState([]);
  const [ProfitLoss, setProfitLoss] = useState(0);
  const [PortfolioPLError, setPortoflioPLError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    api
      .getPortfolioProfitLoss(uid)
      .then((data) => {
        setIsLoading(false);
        setPortfolioData(data);
      })
      .catch((err) => {
        setPortoflioPLError(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setProfitLoss(
      PortfolioData.reduce((acc, stock) => acc + stock.ProfitLoss, 0)
    );
  }, [PortfolioData]);

  return (
    <Grid
      sx={{ width: "100%", m: "10px auto" }}
      style={{
        fontFamily: "Roboto Mono",
        fontSize: "1.3em",
        marginBottom: "25px",
      }}
    >
      <p>{PortfolioPLError}</p>
      <Card elevation={8}>
        <Grid align="center">
          <Typography
            variant="h6"
            style={{
              fontFamily: "Roboto Mono",
              fontSize: "1.6em",
              marginTop: "25px",
            }}
          >
            Portfolio Progress
          </Typography>
          <List
            style={{
              marginLeft: "25px",
              marginBottom: "25px",
            }}
          >
            {PortfolioData.map((stock) => (
              <ListItem key={stock.name}>{`${
                stock.name
              }: £${stock.ProfitLoss.toFixed(2)}`}</ListItem>
            ))}
            <ListItem
              className={ProfitLoss < 0 ? classes.loss : classes.profit}
            >{`Total: £${ProfitLoss.toFixed(2)}`}</ListItem>
          </List>
        </Grid>
      </Card>
    </Grid>
  );
}

export default PortfolioProfitLoss;
