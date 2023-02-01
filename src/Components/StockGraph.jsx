import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@6/+esm";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

function StockGraph() {
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [TimeScale, setTimeScale] = useState("max");

  const { symbol } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.fetchStockData(symbol, TimeScale).then((res) => {
      setIsLoading(false);
      const data = JSON.parse(res);
      const sortedData = Object.keys(data.Date).map((key) => {
        return {
          date: data.Date[key],
          high: data.High[key],
          low: data.Low[key],
          open: data.Open[key],
          close: data.Close[key],
          volume: data.Volume[key],
        };
      });

      setData(sortedData);
    });
  }, [symbol, TimeScale]);

  const onMaxClick = (e) => {
    e.preventDefault();
    setTimeScale("max");
  };
  const onYearClick = (e) => {
    e.preventDefault();
    setTimeScale("1y");
  };
  const onMonthClick = (e) => {
    e.preventDefault();
    setTimeScale("1mo");
  };
  const on5DaysClick = (e) => {
    e.preventDefault();
    setTimeScale("5d");
  };

  const svg = d3.select(".svg-canvas");
  svg.selectAll("*").remove();

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(Data, (d) => new Date(d.date)))
    .range([50, 500]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(Data, (d) => d.low), d3.max(Data, (d) => d.high)])
    .range([350, 50]);

  const line = d3
    .line()
    .x((d) => xScale(new Date(d.date)))
    .y((d) => yScale(d.close))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(Data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

  let xAxis;

  if (TimeScale === "max") {
    xAxis = d3.axisBottom(xScale);
  } else if (TimeScale === "1y") {
    xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));
  } else if (TimeScale === "1mo") {
    xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d%b"));
  } else if (TimeScale === "5d") {
    xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d %b"));
  }

  const yAxis = d3.axisLeft(yScale);

  svg.append("g").attr("transform", "translate(0, 350)").call(xAxis);

  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

  return (
    <div>
      <button onClick={onMaxClick}>Max</button>
      <button onClick={onYearClick}>1 Year</button>
      <button onClick={onMonthClick}>1 Month</button>
      <button onClick={on5DaysClick}>5 Days</button>
      {IsLoading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <svg className="svg-canvas" width="500px" height="400px" />
    </div>
  );
}

export default StockGraph;
