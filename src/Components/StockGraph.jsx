import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@6/+esm";
import { useParams } from "react-router-dom";

function StockGraph() {
  const [Data, setData] = useState([]);

  const { symbol } = useParams();

  useEffect(() => {
    api.fetchStockData(symbol).then((res) => {
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
  }, [symbol]);

  const svg = d3.select(".svg-canvas");
  svg.selectAll("*").remove();

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(Data, (d) => new Date(d.date)))
    .range([50, 450]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(Data, (d) => d.low), d3.max(Data, (d) => d.high)])
    .range([350, 50]);

  const line = d3
    .line()
    .x((d) => xScale(new Date(d.date)))
    .y((d) => yScale(d.close))
    .curve(d3.curveMonotoneX);

  const max = d3.max(Data, function (d) {
    return +d.close;
  });

  svg
    .append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", yScale(0))
    .attr("x2", 0)
    .attr("y2", yScale(max))
    .selectAll("stop")
    .data([
      { offset: "0%", color: "green" },
      { offset: "100%", color: "red" },
    ])
    .enter()
    .append("stop")
    .attr("offset", function (d) {
      return d.offset;
    })
    .attr("stop-color", function (d) {
      return d.color;
    });

  svg
    .append("path")
    .datum(Data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "url(#line-gradient)")
    .attr("stroke-width", 2);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g").attr("transform", "translate(0, 350)").call(xAxis);

  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

  return (
    <div>
      <svg className="svg-canvas" width="500px" height="400px" />
    </div>
  );
}

export default StockGraph;
