import React, { useState, useEffect } from "react";
import * as api from "../utils/api";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@6/+esm";

function StockGraph() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    api.fetchStockData().then((res) => {
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
  }, []);

  const svg = d3
    .select("#chart-element")
    .append("svg")
    .attr("width", 800)
    .attr("height", 600);

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(Data, (d) => new Date(d.date)))
    .range([50, 750]);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(Data, (d) => d.low), d3.max(Data, (d) => d.high)])
    .range([550, 50]);

  const line = d3
    .line()
    .x((d) => xScale(new Date(d.date)))
    .y((d) => yScale(d.close))
    .curve(d3.curveMonotoneX);

  const max = d3.max(Data, function (d) {
    console.log(d);
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

  svg.append("g").attr("transform", "translate(0, 550)").call(xAxis);

  svg.append("g").attr("transform", "translate(50, 0)").call(yAxis);

  return (
    <div>
      <div id="chart-element"></div>
    </div>
  );
}

export default StockGraph;
