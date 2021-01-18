import React, { useEffect } from 'react';
import * as _d3 from 'd3';

interface Props {
    breakdown: Breakdown;
}

export const BreakdownBarChart: React.FC<Props> = ({ breakdown }) => {
    //clean up breakdown data to conform to bar chart
    let cleanedBreakdown:any[] = [];
    Object.keys(breakdown).map(key => {
        cleanedBreakdown.push({
            x: key,
            y: Math.abs(breakdown[key])
        })
    })

    useEffect(() => {
        if(!breakdown){
            return;
        } else {
            const margin = 60;
            const width = 1000 - 2 * margin;
            const height = 600 - 2 * margin;
            const svg = _d3.select('svg.spending-breakdown');
            const chart = svg.append('g')
                                .attr('transform', `translate(${margin}, ${margin})`);
            
            //define yScale parameters
            const yScale = _d3.scaleLinear()
                            .range([height, 0])
                            .domain([0, _d3.max(cleanedBreakdown, (b) => b.y)]);

            //append y axis
            chart.append('g')
                .call(_d3.axisLeft(yScale));
            
            //define xScale parameters
            const xScale = _d3.scaleBand()
                                .rangeRound([0, width])
                                .domain(cleanedBreakdown.map(d => d.x))
                                .padding(0.2)
                                .align(0.5)
                                .round(true)

            //add scale amount to cleaned breakdown object
            cleanedBreakdown.forEach(b => {
                b.scale = xScale(b.x)
            })
            
            //append x axis
            chart.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(_d3.axisBottom(xScale));

            //create bars
            const bar = chart.selectAll('group')
                                .data(cleanedBreakdown)
                                .enter()
            
            //append rect elements for each breakdown item
            bar.append('rect')
                .style('fill', '#9003fc')
                .style('rx', '5')
                .attr('x', (s) => s.scale)
                .attr('y', (s) => yScale(s.y))
                .attr('height', (s) => height - yScale(s.y))
                .attr('width', xScale.bandwidth())
            
            //append text elements labelling total spent for each breakdown item
            bar.append('text')
                .attr('x', (s) => s.scale)
                .attr('y', (s) => yScale(s.y) - 5)
                .text((d) => `$${(d.y).toFixed(2)}`)
                .attr('font-size', '10px')
                }
    }, [breakdown])
   
    return (
        <div className='bar-chart'>
            { cleanedBreakdown?.length
                ? null
                : <div>Sorry, no data currently available.</div>
            }
            <svg className='spending-breakdown' width={1000} height={600}></svg>
        </div>
    );
  }