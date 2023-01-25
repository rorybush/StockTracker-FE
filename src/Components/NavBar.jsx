import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar color="info">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h3">StockTracker</Typography>
        <Toolbar>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to={"/login"}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="warning"
            component={Link}
            to={"/signup"}
            sx={{ml:1}}
          >
            Signup
          </Button>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
