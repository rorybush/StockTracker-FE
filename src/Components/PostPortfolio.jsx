//post portfolio

import React from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import "./postPortfolio.css";
import { Grid, Paper, TextField, Button } from "@mui/material";

function PostPortfolio() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };

  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;

  const postNewStock = (e) => {
    e.preventDefault();
    console.log(e, "BUTTON");
    const stockName = e.target[0].value;
    const quantity = e.target[2].value;
    const price = e.target[4].value;
    const date = e.target[6].value;
    api.postPortfolioStock(uid, stockName, date, quantity, price);
  };

  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align="center">
          {uid && (
            <form onSubmit={postNewStock}>
              <TextField
                fullWidth
                label="Stock Name"
                sx={textStyle}
                type="text"
                name="stockName"
                placeholder="Enter a stock name"
                required
              ></TextField>
              <TextField
                fullWidth
                label="Quantity"
                sx={textStyle}
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                required
              ></TextField>
              <TextField
                fullWidth
                label="Purhcase price"
                sx={textStyle}
                type="number"
                name="price"
                placeholder="Enter purchase price"
                required
              ></TextField>
              <TextField
                fullWidth
                // label='Purhcase date'
                sx={textStyle}
                type="date"
                name="date"
                required
              ></TextField>
              <Button
                fullWidth
                sx={textStyle}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </form>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default PostPortfolio;

// <div >
//   {uid && (
//     <form onSubmit={postNewStock} className="portfolio-form">
//       <label>Stock Name </label>
//       <input type="text" name="stockName" required /><br/>

//       <label>Quantity </label>
//       <input type="number" name="quantity" required /><br/>

//       <label>Purchase Price </label>
//       <input type="number" step="0.01" name="price" required /><br/>

//       <label>Purchase Date </label>
//       <input type="date" name="date" required /><br/>

//       <input type="submit" />
//     </form>
//   )}
// </div>


/*
  Show Portfolio page
  <ul key={stock.name}>
            <li>Name: {stock.name.toUpperCase()}</li>
            <li>Date: {stock.date}</li>
            <li>Price: {stock.price}</li>
            <li>Quantity: {stock.quantity}</li>
            <button onClick={deleteStock}>DELETE STOCK</button>
            <button onClick={(e) => editStock(e, stock.name)}>
              EDIT STOCK
            </button>
            {showEditStock[stock.name] && (
              <PatchPortfolio
                stockName={stock.name}
                date={stock.date}
                price={stock.price}
                quantity={stock.quantity}
              />
            )}
          </ul>


          <Box>
      <Stack direction='row' spacing={3} justifyContent="space-around">
      {isLoading && <p>Loading...</p>}
      <PostPortfolio />
      <Paper elevation={10} sx={{paperStyle}}>
        <List>
      {Portfolio.map((stock) => {
        return (
          <ListItem key={stock.name}>
            <ListItemText>Name: {stock.name.toUpperCase()}</ListItemText>
            <ListItemText>Date: {stock.date}</ListItemText>
            <ListItemText>Price: {stock.price}</ListItemText>
            <ListItemText>Quantity: {stock.quantity}</ListItemText>
            <Button onClick={deleteStock} variant='contained'>DELETE STOCK</Button>
            <Button onClick={(e) => editStock(e, stock.name)} variant='contained'>
              EDIT STOCK
            </Button>
            {showEditStock[stock.name] && (
              <PatchPortfolio
                stockName={stock.name}
                date={stock.date}
                price={stock.price}
                quantity={stock.quantity}
              />
            )}
          </ListItem>
        );
      })}
      </List>
      </Paper>
      </Stack>
      <Button onClick={deletePortfolio} variant="outlined" color="info">DELETE PORTFOLIO</Button>
      
    </Box>


        <Container spacing={2}>
       {isLoading && <p>Loading...</p>}
       <Stack direction='row' spacing={3} justifyContent="space-around">
      <PostPortfolio />
      <Paper elevation={10} sx={{paperStyle}}>
          {Portfolio.map((stock) => {
      <List sx={{ bgcolor: "background.paper" }}>
            return (
          <ListItem divider disableGutters key={stock.name}>
            <ListItemText>Name: {stock.name}</ListItemText>
          </ListItem>
          <ListItem divider disableGutters key={stock.name}>
            <ListItemText>Date: {stock.date}</ListItemText>
            </ListItem>
            <ListItem divider disableGutters key={stock.name}>
            <ListItemText>Price: {stock.price}</ListItemText>
            </ListItem>
            <ListItem divider disableGutters key={stock.name}>
            <ListItemText>Quantity: {stock.quantity}</ListItemText>
            </ListItem>
            <ListItem divider disableGutters key={stock.name}>
            <Button onClick={deleteStock} variant='contained'>DELETE STOCK</Button>
            <Button onClick={(e) => editStock(e, stock.name)} variant='contained'>
              EDIT STOCK
            </Button>
            </ListItem>
            {showEditStock[stock.name] && (
              <PatchPortfolio
                stockName={stock.name}
                date={stock.date}
                price={stock.price}
                quantity={stock.quantity}
              />
            )}
          

            )
        </List>
          })}

          
        </Paper>
      </Stack>
      <Button onClick={deletePortfolio} variant="outlined" color="info">DELETE PORTFOLIO</Button>
    </Container>
*/