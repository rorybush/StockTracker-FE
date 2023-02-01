import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import { Card, Grid, List, ListItem, Paper, Typography } from "@mui/material";
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

  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };

  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [PortfolioData, setPortfolioData] = useState([]);
  const [ProfitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    api.getPortfolioProfitLoss(uid).then((data) => {
      setIsLoading(false);
      setPortfolioData(data);
    });
  }, []);

  useEffect(() => {
    setProfitLoss(
      PortfolioData.reduce((acc, stock) => acc + stock.ProfitLoss, 0)
    );
  }, [PortfolioData]);

  return (
    <Grid sx={{ width: 300, m: "10px auto" }}>
      {/* <Paper elevation={10} sx={{paperStyle}}> */}
      <Card>
        <Grid align="center">
          <Typography variant="h6">Portfolio Progress</Typography>
          <List>
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
      {/* </Paper> */}
    </Grid>
  );
}

export default PortfolioProfitLoss;
