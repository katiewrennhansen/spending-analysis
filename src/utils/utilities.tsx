import * as _d3 from 'd3';

/*  
    ====================
    AVAILABLE FUNTIONS
    ====================
    1. calculateTotals - caculate total credit/debit on account per month
    2. buildGraph - build d3 visualization
    3. formatNumber - format numbers with commas in the thousands place, and round to 2 decimal pts
*/

//caculate total credit/debit on account per month
export const calculateTotals = (transactions: Transaction[], type: 'credit' | 'debit'): number  => {
    let total: number = 0;
    
    //filter for all transaction of set type, add to total 
    transactions.forEach(transaction => (
        (transaction['Transaction Type'] === type) && (total += Number(transaction['Amount'])))
    )

    return Number(total.toFixed(2));
}

//build d3 data visualization around input breakdown data
export const buildGraph = (breakdown: any[], el:string, addText: boolean): void => {
    const margin = 80;
    const width = 900;
    const height = 500;
    const svg = _d3.select(`svg.${el}`)

    if(svg && breakdown){
        //clear svg between re-renders
        svg.selectAll('*').remove();

        const chart = svg.append('g')
                            .attr('transform', `translate(${margin}, ${margin})`);
        
        //define yScale parameters
        const yScale = _d3.scaleLinear()
                        .range([height, 0])
                        .domain([0, _d3.max(breakdown, (b) => b.y)]);
    
        //append y axis
        chart.append('g')
            .call(_d3.axisLeft(yScale));
        
        //define xScale parameters
        const xScale = _d3.scaleBand()
                            .rangeRound([0, width])
                            .domain(breakdown.map(d => d.x))
                            .padding(0.2)
                            .align(0.5)
                            .round(true)
    
        //add x-scale amount to object
        breakdown.forEach(b => {
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
                            .data(breakdown)
                            .enter()
        
        //append rect elements for each item
        bar.append('rect')
            .style('fill', '#00d9ad')
            .style('rx', '5')
            .attr('x', (s) => s.scale)
            .attr('y', (s) => yScale(s.y))
            .attr('height', (s) => height - yScale(s.y))
            .attr('width', xScale.bandwidth())
        
        //if text parameter has been set, add text labels to chart
        if(addText){
            //define width of current bar
            let barWidth = xScale.bandwidth();

            //build line chart
            let line = _d3.line<GraphItem>()
                            .x((d: GraphItem) => d.scale + margin + barWidth/2)
                            .y((d: GraphItem) => yScale(d.y) + margin)
                            .curve(_d3.curveMonotoneX)

            //append line chart
            svg.append("path")
                .datum(breakdown)
                .attr("fill", "none")
                .attr("stroke", "hsl(0, 0%, 17%)")
                .attr("stroke-width", 1.5)
                .attr("d", line)

            //append dots and add tooltip functionality 
            svg.selectAll('dot')	
                .data(breakdown)		
                .enter()
                    .append('circle')								
                    .attr('r', 4)	
                    .attr('cx', (s) => s.scale + margin + barWidth/2)
                    .attr('cy', (s) => yScale(s.y) + margin)

            //append text elements
            bar.append('text')
                .attr('x', (s) => s.scale)
                .attr('y', (s) => yScale(s.y) - 24)
                .attr("dx", barWidth/2)
                .text((s) => `$${formatNumber((s.y).toFixed(2))}`)
                .attr('font-size', '14px')
                .attr('text-anchor', 'middle')
                .attr('fill', 'hsl(0, 0%, 17%)')
                .attr('font-weight', '800')        
        }
    }
}

//format numbers with commas in the thousands place, and round to 2 decimal pts
export const formatNumber = (num: any): string => {
    let formatted: string = '0';

    if(num) {
        //round to 2 decimal pts
        let newFloat = parseFloat(num)
                            .toFixed(2)
        //replace commas
        formatted = newFloat
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    } 

    return formatted;
}