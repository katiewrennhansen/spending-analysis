import React from 'react';
import * as _d3 from "d3";

declare global {
    const d3: typeof _d3;
  }

interface Props {
    transactions: Transaction[];
}

export const BreakdownBarChart: React.FC<Props> = ({ transactions }) => {
    _d3.select("svg")
        .append("circle")
        .attr("r", 5)
        .attr("cx", 2)
        .attr("cy", 2)
        .attr("fill", "red");
  
    return (
        <svg className="container" width="2px" height="10px"></svg>
    );
  }