import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AboutSection from "./Components/AboutSection";
import Navv from "./Components/Navv";
import StockNews from "./Components/StockNews";
import StockGraph from "./Components/StockGraph";
import ShowPortfolio from "./Components/ShowPortfolio";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navv />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/stock" element={<AboutSection />}>
          {" "}
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/news" element={<StockNews />}></Route>
        <Route path="/stockgraph" element={<StockGraph />}></Route>
        <Route path="/portfolio" element={<ShowPortfolio />}></Route>
        <Route path="/stockgraph" element={<StockGraph />}></Route>
      </Routes>
    </div>
  );
}

export default App;
