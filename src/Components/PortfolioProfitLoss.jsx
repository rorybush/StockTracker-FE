import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import { getAuth } from "firebase/auth";

function PortfolioProfitLoss() {
  const auth = getAuth();
  const uid = "498jsaodfjadslfjakldfkjal";
  //   auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [PortfolioData, setPortfolioData] = useState([]);
  const [ProfitLoss, setProfitLoss] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    api.getPortfolioProfitLoss(uid).then((data) => {
      setIsLoading(false);
      setPortfolioData(data);
    });
  }, []);

  useEffect(() => {
    setProfitLoss(
      PortfolioData.reduce((acc, stock) => acc + stock.ProfitLoss, 0)
    );
  }, [PortfolioData]);

  return (
    <div>
      <ul>
        {PortfolioData.map((stock) => (
          <li key={stock.name}>{`${stock.name}: £${stock.ProfitLoss.toFixed(
            2
          )}`}</li>
        ))}
        <li>{`Total: £${ProfitLoss.toFixed(2)}`}</li>
      </ul>
    </div>
  );
}

export default PortfolioProfitLoss;
