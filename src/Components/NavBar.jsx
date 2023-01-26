import React, {useEffect, useState} from "react";
import { AppBar, Toolbar, Typography, InputBase, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase'
// import {Button} from '@mui/material-next'
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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
    <AppBar position='static' color='info'>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h3">StockTracker</Typography>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <Toolbar>
          <Typography sx={{mr: 4}}>
            {authUser && <p>{`Signed in as ${authUser.email}`}</p>}
          </Typography>
          <Button
            variant="outlined"
            color='inherit'
            component={Link}
            to={"/login"}
          >
            Login
          </Button>
          <Button
          variant="outlined"
          color='inherit'
          sx={{ml:1}}
          onClick={logout}
        >
          Logout
        </Button>
        <Button
            variant="outlined"
            color='inherit'
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
