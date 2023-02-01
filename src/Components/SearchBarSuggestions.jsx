import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";
import { Link } from "react-router-dom";

function SearchBarSuggestions() {
  const [StockList, setStockList] = useState([]);
  const [UserInput, setUserInput] = useState("");
  const [filteredSearchData, setfilteredSearchData] = useState([]);

  useEffect(() => {
    api.getStockList().then((data) => {
      setStockList(data);
    });
  }, []);

  const handleSearch = (e) => {
    setUserInput(e.target.value);
    setfilteredSearchData(
      StockList.filter(
        (stock) =>
          stock.companyName
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase()) ||
          stock.symbol.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="searchbar">
      <div className={`searchbar--input`}>
        <input label="Search..." value={UserInput} onChange={handleSearch} />
      </div>
      {UserInput.length > 0 && filteredSearchData.length > 0 ? (
        <div className="searchbar--suggestions">
          {filteredSearchData.slice(0, 10).map((stock) => (
            <li key={stock.symbol}>
              <Link
                to={`stock/${stock.symbol}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  height: "100%",
                  width: "100%",
                }}
              >
                {stock.companyName} <span>•</span> {stock.symbol}
              </Link>
            </li>
          ))}
        </div>
      ) : (
        ""
      )}
      <SearchIcon />
    </div>
  );
}
export default SearchBarSuggestions;
