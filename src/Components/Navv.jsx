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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import SearchBarSuggestions from "./SearchBarSuggestions";

// const Search = styled("div")(({theme}) => ({
//     backgroundColor: "white",
//     padding:"0 10px",
//     borderRadius: theme.shape.borderRadius,
//     width: "40%"
// }))

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "70%",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

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
        {/* <Typography component={Link} to={'/'} variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          PyNance
        </Typography> */}
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
        <NightsStayOutlinedIcon
          sx={{ display: { xs: "block", sm: "none" }, mr: 2 }}
        />
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
        <SearchBarSuggestions />
        <Icons>
<<<<<<< HEAD
            <Button variant='text' color='inherit' size="large" component={Link} to={'/'}>HOME</Button>
            <Button variant='text' color='inherit' size="large">MARKET</Button>
            <Button variant='text' color='inherit' size="large" component={Link} to={'/news'}>NEWS</Button>
            <Button variant='outlined' color='inherit' size="medium" component={Link} to={'/signup'}>Signup</Button>
            <Avatar sx={{width:30, height:30 }} onClick={(e) => setOpen(true)}/>
=======
          <Button
            variant="text"
            color="inherit"
            size="large"
            component={Link}
            to={"/"}
          >
            HOME
          </Button>
          <Button variant="text" color="inherit" size="large">
            MARKET
          </Button>
          <Button variant="text" color="inherit" size="large">
            NEWS
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            component={Link}
            to={"/signup"}
          >
            Signup
          </Button>
          <Avatar
            sx={{ width: 30, height: 30 }}
            onClick={(e) => setOpen(true)}
          />
>>>>>>> 9bf2e3a8e8cfed5284899cb960e373cd921e837c
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
        <MenuItem>Portfolio</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navv;
