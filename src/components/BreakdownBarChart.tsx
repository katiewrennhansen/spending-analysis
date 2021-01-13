import React from 'react';
import * as _d3 from 'd3';

interface Props {
    transactions: Transaction[];
    breakdown: Breakdown;
}

export const BreakdownBarChart: React.FC<Props> = ({ transactions, breakdown }) => {
    const margin = 60;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;
    const svg = _d3.select('svg');
    const chart = svg.append('g')
                        .attr('transform', `translate(${margin}, ${margin})`);
    
    const yScale = _d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, 100]);

    chart.append('g')
        .call(_d3.axisLeft(yScale));

    const values = Object.keys(breakdown)
    
    const xScale = _d3.scaleBand()
                        .range([0, width])
                        .domain(['Restaurants', 'Internet', 'Gas & Fuel', 'Movies & DVDs', 'Music', 'Alcohol & Bars', 'Groceries', 'Gift', 'Shipping', 'Auto Insurance', 'Laundry', 'Compost', 'Mortgage & Rent'])
                        .padding(0.2)

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(_d3.axisBottom(xScale));
    
    chart.selectAll()
        .data(values)
        .enter()
        .append('rect')
        // .attr('x', (s) => xScale(breakdown[s]))
        // .attr('y', (s) => yScale(s.value))
        // .attr('height', (s) => height - yScale(s.value))
        .attr('width', xScale.bandwidth())
   
    return (
        <div className='bar-chart'>
            <svg className='container' width={1000} height={600}></svg>
        </div>
    );
  }