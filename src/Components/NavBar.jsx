import React, {useEffect, useState} from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'

const NavBar = () => {

  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
              setAuthUser(user)
          } else {
              setAuthUser(null)
          }
      })

      return () => {
          listen();
      }
  }, [])

  const logout = () => {
    signOut(auth)
    .then(() => {
      alert('User logged out!')
    }).catch(err => console.log(err))
  }

  return (
    <AppBar color="info">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h3">StockTracker</Typography>
        <Toolbar>
          <Typography sx={{mr: 4}}>
            {authUser && <p>{`Signed in as ${authUser.email}`}</p>}
          </Typography>
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
          <Button
          variant="contained"
          color="warning"
          sx={{ml:1}}
          onClick={logout}
        >
          Logout
        </Button>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
