import React, {useState} from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";
import "./postPortfolio.css";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";



function PostPortfolio({ Portfolio, setPortfolio }) {  
  const paperStyle = { padding: "30px 20px", width: 300, margin: "60px auto" };
  const textStyle = { margin: "10px auto 0px" };
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  const [NewStock, setNewStock] = useState({
    name: "",
    date: "",
    quantity: "",
    price: "",
  });
  //   auth.currentUser.uid;

  const postNewStock = (e) => {
    e.preventDefault();
    console.log(e, "post function")
    setPortfolio((currStocks) => {
      return [NewStock, ...currStocks];
    });

    api.postPortfolioStock(
      uid,
      NewStock.name.toUpperCase(),
      NewStock.date,
      NewStock.quantity,
      NewStock.price
    );
  };

  return (
    <Grid>
      <Paper elevation={10} sx={paperStyle}>
        <Grid align='center'>
          <Typography variant='subtitle1' sx={{mb:2}}>
            Add stocks to your portfolio.
          </Typography>
      {uid && (
        <form onSubmit={postNewStock}>
          
          <TextField
            type="text"
            name="stockName"
            label="Stock Name"
            placeholder="Enter stock name"
            fullWidth
            required
            sx={textStyle}
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                name: e.target.value.toUpperCase(),
              });
            }}
          />

          
          <TextField
            type="number"
            name="quantity"
            label="Quantity"
            required
            fullWidth
            placeholder="Enter quantity"
            sx={textStyle}
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                quantity: e.target.value,
              });
            }}
          />

          
          <TextField
            type="number"
            step="0.01"
            name="price"
            label="Purchase Price"
            placeholder="Enter purchase price"
            fullWidth
            required
            sx={textStyle}
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                price: e.target.value,
              });
            }}
          />

          
          <TextField
            type="date"
            name="date"
            required
            fullWidth
            sx={textStyle}
            onChange={(e) => {
              setNewStock({
                ...NewStock,
                date: e.target.value,
              });
            }}
          />

          <Button 
          type="submit"
          sx={textStyle}
          fullWidth
          variant="contained"
           > Save</Button>
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