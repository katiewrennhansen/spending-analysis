import React, { useState, useEffect } from 'react';
import * as _d3 from 'd3';

interface Props {
    transactions: Transaction[];
    dates: string[];
    breakdown: Breakdown;
}

export const Monthly: React.FC<Props> = ({ transactions, dates, breakdown }) => {
    const [activeCat, setActiveCat] = useState();
    const categories = Object.keys(breakdown);

    //build object for groceries over time
    const breakdownMonth: BuildMonthly = (transactions: Transaction[], category) => {
        setActiveCat(category);

        //create new object 
        let summary: Summary = {};
        let graphData: any[] = [];
        //loop through transactions
        transactions.forEach(t => {
            if(t['Category'] === category){
                //split dates into MM/YYYY 
                let splitDate = t['Date'].split('/')
                let condensedDate = `${splitDate[0]}/${splitDate[2]}`;
                //if no current value, create new value
                if(!Object.keys(summary).includes(condensedDate)){
                    summary[condensedDate] = Number(t['Amount'])
                } else {
                    //if value, add to values
                    summary[condensedDate] = Number(summary[condensedDate]) + Number(t['Amount']);
                }
            }
        }) 

        //build array for x,y data
        Object.keys(summary).map(key => {
            graphData.push({ 
                x: key,
                y: Number(summary[key].toFixed(2))
            })
        })

        //reverse data 
        let data = graphData.reverse();

        //return data array
        return data;
    }



    useEffect(() => {
        if(!transactions){
            return;
        } else {

            const monthlyBreakdown = breakdownMonth(transactions, 'Groceries');

            const margin = 100;
            const width = 900 - 2 * margin;
            const height = 500 - 2 * margin;
            const svg = _d3.select('svg.monthly-breakdown');
            const chart = svg.append('g')
                                .attr('transform', `translate(${margin}, ${margin})`);
            
            //define yScale parameters
            const yScale = _d3.scaleLinear()
                            .range([height, 0])
                            .domain([0, _d3.max(monthlyBreakdown, (b) => b.y)]);

            //append y axis
            chart.append('g')
                .call(_d3.axisLeft(yScale));
            
            //define xScale parameters
            const xScale = _d3.scaleBand()
                                .rangeRound([0, width])
                                .domain(monthlyBreakdown.map(d => d.x))
                                .padding(0.2)
                                .align(0.5)
                                .round(true)

            //add scale amount to cleaned breakdown object
            monthlyBreakdown.forEach(b => {
                b.scale = xScale(b.x)
            })
            
            //append x axis
            chart.append('g')
                .attr('transform', `translate(0, ${height})`)
                .call(_d3.axisBottom(xScale))
                .selectAll("text")	
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(-65)");

            //create bars
            const bar = chart.selectAll('group')
                                .data(monthlyBreakdown)
                                .enter()
            
            //append rect elements for each breakdown item
            bar.append('rect')
                .style('fill', '#00d9ad')
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
    }, [transactions])

    return (
        <div>
            <h2>Monthly Data{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 2]}` : ''}</h2>

            { transactions?.length
                ? <div>
                    <h3>{activeCat}</h3>
                    <select>
                        { categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                : <div>Sorry, no data currently available.</div>
            }
            <svg className='monthly-breakdown' width={900} height={500}></svg>
        </div>
    )
}