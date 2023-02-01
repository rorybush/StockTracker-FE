import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function StockAI({ stock }) {
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

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Prediction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Today</TableCell>
            <TableCell>${stock.latestPrice.toFixed(2)}</TableCell>
          </TableRow>
          {StockAI.map((prediction) => (
            <TableRow key={prediction.date}>
              <TableCell>
                {moment(prediction.date).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>${prediction.prediction.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StockAI;
