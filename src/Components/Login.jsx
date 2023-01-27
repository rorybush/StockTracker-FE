import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {auth} from '../utils/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'


const Login = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const login = async (e) => {
    e.preventDefault()
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/')
    }).catch(err => {
      console.error(err);
      alert('Incorrect email or password');
    })
  }

  return (
    <Grid>
      <Paper elevation={20} sx={paperStyle}>
        <Grid align="center">
          <Avatar></Avatar>
          <Typography>Log In!</Typography>
          <Typography variant="caption" color="textSecondary">
            Forgot your password?
          </Typography>
          <form>
            <TextField
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              sx={textStyle}
              fullWidth
              label="Email"
              placeholder="Enter an email"
            />
            <TextField
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              sx={textStyle}
              type={passwordShown ? "text" : "password"}
              fullWidth
              label="Password"
              placeholder="Enter a password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password' edge='end' onClick={togglePassword}>
                    {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              sx={textStyle}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={login}
            >
              Login
            </Button>
          </form>
          <Typography sx={textStyle}>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
