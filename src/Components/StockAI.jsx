import React, { useEffect, useState } from "react";
import * as api from "../utils/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Alert } from "@mui/material";
import Disclaimer from "./Disclaimer";

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
        {/* <Disclaimer/> */}
      <Alert severity="info">
        Pynance.AI stock prediction is not financial advice.
      </Alert>

      <Table>
        <TableBody>
          <TableRow
            style={{
              backgroundColor: "#3E9AD8",
              textAlign: "center",
            }}
          >
            <TableCell
              colSpan={2}
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              Current Stock Price:<span> </span>
              {stock.latestPrice ? (
                `$${stock.latestPrice.toFixed(2)}`
              ) : (
                <p>Loading...</p>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#0088D1",
                color: "white",
                textAlign: "center",
              }}
            >
              Date
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#0088D1",
                color: "white",
                textAlign: "center",
              }}
            >
              Prediction
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {StockAI.map((prediction) => (
            <TableRow
              key={prediction.date}
              style={{ backgroundColor: "#3E9AD8" }}
            >
              <TableCell
                style={{
                  color: "white",
                  border: "1px solid #0088D1",
                  textAlign: "center",
                }}
              >
                {moment(prediction.date).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  border: "1px solid #0088D1",
                  textAlign: "center",
                }}
              >
                ${prediction.prediction.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StockAI;
