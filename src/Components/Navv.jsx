import {
  AppBar,
  Toolbar,
  styled,
  alpha,
  Box,
  InputBase,
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import SearchBarSuggestions from "./SearchBarSuggestions";

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: 15,
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 5,
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Navv = () => {
  const [open, setOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const logout = () => {
    if (authUser) {
      signOut(auth)
        .then(() => {
          alert("User logged out!");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <AppBar position="sticky" color="info">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          component={Link}
          to={"/"}
          size="large"
          variant="text"
          color="inherit"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          PyNance
        </Button>
        <IconButton>
          <Link to="/">
            <NightsStayOutlinedIcon
              sx={{
                color: blue[100],
                display: { xs: "block", sm: "none" },
                mr: 2,
                fontSize: 30,
              }}
            />
          </Link>
        </IconButton>

        <SearchBarSuggestions />
        <Icons>
          <Button
            variant="text"
            color="inherit"
            size="large"
            component={Link}
            to={"/"}
          >
            HOME
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="large"
            component={Link}
            to={"/portfolio"}
          >
            PORTFOLIO
          </Button>
          <Button
            variant="text"
            color="inherit"
            size="large"
            component={Link}
            to={"/news"}
          >
            NEWS
          </Button>
          {authUser ? (
            ""
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              size="medium"
              component={Link}
              to={"/signup"}
            >
              Signup
            </Button>
          )}

          <Avatar
            sx={{ width: 30, height: 30 }}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <MenuIcon />
        </UserBox>
      </Toolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {authUser ? (
          <MenuItem>Logged in</MenuItem>
        ) : (
          <MenuItem>
            <Link to="/login" color="secondary" underline="none">
              Login
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          {" "}
          <Link to="/portfolio" color="secondary" underline="none">
            Portfolio
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navv;
