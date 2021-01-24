import * as _d3 from 'd3';

/*  
    ====================
    AVAILABLE FUNTIONS
    ====================
    1. buildBreakdown - build category breakdown
    2. calculateTotals - caculate total credit/debit on account per month
    3. buildSummary - build summary object
    4. cleanData - exclude select fields and categories from transactions array
    5. buildDateRange - build array containing sorted transactions dates
    6. cleanBreakdownData - clean up breakdown data to conform to bar chart
    7. breakdownMonth - build monthly data for selected category over time
    8. buildGraph - build d3 visualization
*/


//build category breakdown
export const buildBreakdown = (transactions: Transaction[]): Breakdown => {
    let categories: string[] = [];
    let breakdown: Breakdown = {};

    //build array of categories
    transactions
        .map(transaction => (!categories.includes(transaction['Category'])) ? categories.push(transaction['Category']) : null)

    //break out spending into cateogries
    categories.forEach(category => {
        breakdown[category] = 0;
        transactions
            .filter(transaction => transaction['Category'] === category)
            .forEach(transaction => {
                if(transaction['Transaction Type'] === 'credit') breakdown[category] += Number(transaction['Amount']);
                else breakdown[category] -= Number(transaction['Amount']);
            })
        
        let totalValue = Number(breakdown[category].toFixed(2));
        if(totalValue < 0) breakdown[category] = totalValue;
        else delete breakdown[category];
    })

    return breakdown;
} 

//caculate total credit/debit on account per month
export const calculateTotals = (transactions: Transaction[], type: 'credit' | 'debit'): number  => {
    let totalSpent: number = 0;
    transactions.forEach(transaction => {
        //filter for all transaction of set type
        if(transaction['Transaction Type'] === type){
            //add to totalSpent
            totalSpent += Number(transaction['Amount']);
        }
    })
    return Number(totalSpent.toFixed(2));
}

//build summary object
export const buildSummary = (noTransfers: Transaction[]): Summary => {
    let summary: Summary = {};

    //calculare total income
    let totalIncome = calculateTotals(noTransfers, 'credit');
    summary['totalIncome'] = totalIncome;

    //calculate total amount speant
    let totalSpent = calculateTotals(noTransfers, 'debit');
    summary['totalSpent'] = totalSpent;

    //calculare percent saved
    summary['percentSaved'] = Math.round(((summary.totalIncome - summary.totalSpent) / summary.totalIncome) * 100);

    //calculate total saved
    summary['totalSaved'] = totalIncome - totalSpent;

    return summary;
}

//exclude select fields and categories from transactions array
export const cleanData = (transactions: Transaction[], exclude: string[]): Transaction[] => {
    let filtered: Transaction[] = [];
    
    transactions.forEach(transaction => {
        //if transaction has data, and does not contain exclude category, add to filtered
        if(Object.keys(transaction).length > 1 && !exclude.includes(transaction['Category'])){
            //if each field exists, retun value, else return empty string 
            //transaction type must be either debit/credit
            filtered.push({
                'Date': transaction['Date'] ? transaction['Date'] : '',
                'Account Name': transaction['Account Name'] ? transaction['Account Name'] : '',
                'Description': transaction['Description'] ? transaction['Description'] : '',
                'Amount': transaction['Amount'] ? transaction['Amount'] : '',
                'Transaction Type': transaction['Transaction Type'],
                'Category': transaction['Category'] ? transaction['Category'] : '',
            })
        } 
    })
    
    return filtered;
}

//build array containing sorted transactions dates
export const buildDateRange = (data: Transaction[]): any[] => {
    //create array containing all transaction dates
    let dates: any[] = [];
    data.map(d => dates.push(new Date(d['Date'])))
    dates.sort((a, b) => a - b);

    //clean up date formatting in MM/DD/YYYY format
    let cleanedDates: string[] = [];
    dates.forEach(date => {
      //handle year
      let year = date.getFullYear();

      //handle month
      let month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;

      //handle day
      let day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      //push formatted date into new array
      cleanedDates.push(`${month}/${day}/${year}`);
    })

    return cleanedDates;
}

//clean up breakdown data to conform to bar chart
export const cleanBreakdownData = (data: Breakdown): any[] => {
    let cleanedBreakdown:any[] = [];
    Object.keys(data).forEach(key => {
        cleanedBreakdown.push({
            x: key,
            y: Math.abs(data[key])
        })
    })
    return cleanedBreakdown;
}

//build monthly adata for selected category over time
export const breakdownMonth = (transactions: Transaction[], category: any): any[] => {
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
    Object.keys(summary).forEach(key => {
        graphData.push({ 
            x: key,
            y: Number(summary[key].toFixed(2))
        })
    })

    //reverse data so it sort oldest to most recent
    let data = graphData.reverse();

    //return data array
    return data;
}

//build d3 data visualization around input breakdown data
export const buildGraph = (breakdown: any[], el:string, addText: boolean): void => {
    const margin = 100;
    const width = 900 - 2 * margin;
    const height = 500 - 2 * margin;
    const svg = _d3.select(`svg.${el}`);

    if(svg){
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
            bar.append('text')
                .attr('x', (s) => s.scale)
                .attr('y', (s) => yScale(s.y) - 5)
                .text((d) => `$${(d.y).toFixed(2)}`)
                .attr('font-size', '10px')
        }
    }
}