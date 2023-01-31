import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const passwordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent");
        navigate("/login");
      })
      .catch((err) => {
        alert("User not found!");
      });
  };

  return (
    <Grid>
      <Paper elevation={20} sx={paperStyle}>
        <Grid align="center">
          <IconButton edge="start">
            <Link to="/login">
              <KeyboardBackspaceIcon />
            </Link>
          </IconButton>
          <Typography variant="h5">Find your account</Typography>
          <Divider></Divider>
          <Typography variant="caption" color="textSecondary">
            Enter the email associated with your account to change your password.
          </Typography>
          <form>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={textStyle}
              fullWidth
              label="Email"
              placeholder="Enter an email"
            />
            <Button
              sx={textStyle}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={passwordReset}
            >
              Reset Password
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
