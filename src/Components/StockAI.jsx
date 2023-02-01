import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import { useParams } from "react-router-dom";
import moment from "moment";

function StockAI() {
  const { symbol } = useParams();
  const [StockAI, setStockAI] = useState([]);

  useEffect(() => {
    api.getStockAI(symbol).then((data) => {
      setStockAI(
        Object.entries(data.Date).map(([key, date]) => ({
          date,
          prediction: data.Forecast[key],
        }))
      );
    });
  }, []);

  console.log(StockAI);

  return (
    <div>
      <p></p>
      <ul>
        {StockAI.map((prediction) => {
          return <li key={prediction.date}> {prediction.date}</li>;
        })}
      </ul>
    </div>
  );
}

export default StockAI;
