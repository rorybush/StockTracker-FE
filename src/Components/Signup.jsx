import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db }from '../utils/firebase'
import {ref, set} from 'firebase/database'

const Signup = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user, "SIGN UP USER")
      set(ref(db,"users-db"), {
        "username": username,
        "email": email
      })

    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Grid>
      <Paper elevation={20} sx={paperStyle}>
        <Grid align="center">
          <Avatar></Avatar>
          <Typography>Sign up!</Typography>
          <Typography variant="caption" color="textSecondary">
            Create an account.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={textStyle}
              fullWidth
              label="Username"
              placeholder="Enter a username"
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={textStyle}
              fullWidth
              label="Email"
              placeholder="Enter an email"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textStyle}
              fullWidth
              label="Password"
              placeholder="Enter a password"
            />
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={textStyle}
              fullWidth
              label="Confirm Password"
              placeholder="Enter same password"
            />
            <Button
              onClick={handleClick}
              sx={textStyle}
              type="submit"
              variant="contained"
              color="primary"
            >
              Signup
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
