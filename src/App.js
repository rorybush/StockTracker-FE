import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AboutSection from "./Components/AboutSection";
import Navv from "./Components/Navv";
import StockGraph from "./Components/StockGraph";
import ShowPortfolio from "./Components/ShowPortfolio";
import SingleStock from "./Components/SingleStock";
import TickerList from "./Components/TickerList";
import News from './Components/News'
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navv />
      <TickerList />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/stock" element={<AboutSection />}>
          {" "}
        </Route>
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
