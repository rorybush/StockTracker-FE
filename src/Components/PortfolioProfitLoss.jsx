import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import "./postPortfolio.css";
import { Grid, Paper, TextField, Button } from "@mui/material";

function PortfolioProfitLoss() {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    api.getPortfolioProfitLoss(uid).then((data) => {
      setIsLoading(false);
      console.log(data);
    });
  }, []);
  return <div>PortfolioProfitLoss</div>;
}

export default PortfolioProfitLoss;
