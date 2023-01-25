import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };
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
              sx={textStyle}
              fullWidth
              label="Email"
              placeholder="Enter an email"
            />
            <TextField
              sx={textStyle}
              fullWidth
              label="Password"
              placeholder="Enter a password"
            />
            <Button
              sx={textStyle}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
