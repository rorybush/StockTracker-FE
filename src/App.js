import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import StockGraph from "./Components/StockGraph";
import ShowPortfolio from "./Components/ShowPortfolio";
import SingleStock from "./Components/SingleStock";
import TickerList from "./Components/TickerList";
import News from "./Components/News";
import ForgotPassword from "./Components/ForgotPassword";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <TickerList />
      <Routes>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/stock/:symbol" element={<SingleStock />}></Route>
        <Route path="/stockgraph" element={<StockGraph />}></Route>
        <Route path="/portfolio" element={<ShowPortfolio />}></Route>
      </Routes>
    </div>
  );
}

export default App;
