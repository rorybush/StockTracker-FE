import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Home from './Home'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  InputAdornment,

} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { ref, set, child } from "firebase/database";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

// Password validation regx
const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const Signup = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Validation
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password Validation Function
  const onChangePassword = (password) => {
    setPassword(password);

    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
    });
  };

  // Password Visibility
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown)
  }

  // Form sumbit
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/')
        console.log(user, "SIGN UP USER");
        set(child(ref(db), "users-db"), {
          "user-id": user.uid,
          username: username,
          email: email,
        });
        Home();
      })
      .catch((err) => {
        // const errorCode = err.code;
        // const errorMessage = err.message;
        alert('Username/Email already exists!')
      });

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };


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

  return (
    <Grid >
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
              color={username === "" ? "error" : "success"}
              sx={textStyle}
              fullWidth
              label="Username"
              placeholder="Enter a username"
              required
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={email === "" ? "error" : "success"}
              sx={textStyle}
              fullWidth
              type="email"
              label="Email"
              placeholder="Enter an email"
              required
            />
            <TextField
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
              color={
                passwordValidity.minChar === true &&
                passwordValidity.number === true &&
                passwordValidity.specialChar === true
                  ? "success"
                  : "error"
              }
              onFocus={() => setPasswordFocused(true)}
              sx={textStyle}
              fullWidth
              type={passwordShown ? "text" : "password"}
              label="Password"
              placeholder="Enter a password"
              required
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
            {passwordFocused && (
              <PasswordStrengthIndicator validity={passwordValidity} />
            )}
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={textStyle}
              fullWidth
              type={confirmPasswordShown ? "text" : "password"}
              label="Confirm Password"
              placeholder="Enter same password"
              required
              color={password === confirmPassword ? "success" : "error"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password' edge='end' onClick={toggleConfirmPassword}>
                    {confirmPasswordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
              {/* <IconButton onClick={togglePassword} edge="end">
                {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </TextField> */}
            {password === confirmPassword &&
            passwordValidity.minChar === true &&
            passwordValidity.number === true &&
            passwordValidity.specialChar === true ? (
              <Button
                fullWidth
                sx={textStyle}
                type="submit"
                variant="contained"
                color="primary"
              >
                Signup
              </Button>
            ) : (
              <Button
                disabled
                sx={textStyle}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Signup
              </Button>
            )}
          </form>
          {authUser ? <Typography></Typography> : <Typography sx={textStyle}> Have an account already? <Link to='/login' underline='none' color='primary'>Log in</Link></Typography>}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
