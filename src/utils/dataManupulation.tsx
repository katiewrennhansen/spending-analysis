import { calculateTotals } from './utilities'

/*  
    ====================
    AVAILABLE FUNTIONS
    ====================
    1. buildBreakdown - build category breakdown
    2. buildSummary - build summary object
    3. excludeCategories - exclude select categories from transactions array
    4. cleanData - exclude select fields and categories from transactions array
    5. buildDateRange - build array containing sorted transactions dates
    6. cleanBreakdownData - clean up breakdown data to conform to bar chart
    7. breakdownMonth - build monthly data for selected category over time
    8. buildCategories - build object of all categories with active flag
*/

//build category breakdown
export const buildBreakdown = (transactions: Transaction[]): Breakdown => {
    let categories: string[] = [];
    let breakdown: Breakdown = {};

    //build array of categories
    transactions
        .map(transaction => (!categories.includes(transaction['Category'])) && categories.push(transaction['Category']))

    //break out spending into cateogries
    categories.forEach(category => {
        breakdown[category] = 0;
        transactions
            .filter(transaction => transaction['Category'] === category)
            .forEach(transaction => {
                (transaction['Transaction Type'] === 'credit') 
                    ? breakdown[category] += Number(transaction['Amount'])
                    : breakdown[category] -= Number(transaction['Amount'])
            })
        
        //if total value is negative ($$ spend), assign value else ($$ gained), remove category
        let totalValue = Number(breakdown[category].toFixed(2));
        (totalValue < 0) 
            ? breakdown[category] = totalValue 
            : delete breakdown[category];
    })

    return breakdown;
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

//exclude select categories from transactions array
export const excludeCategories = (transactions: Transaction[], categories: Category[]): Transaction[] => {
    //build array of categories to exclude
    let exclude: string[] = [];
    categories.forEach(cat => cat?.name?.length && cat.active && exclude.push(cat.name))

    //build cleaned array of transactions
    let filtered: Transaction[] = [];
    filtered = transactions.filter(transaction => !exclude.includes(transaction['Category']))
    
    return filtered;
}

//exclude select fields and categories from transactions array
export const cleanData = (transactions: Transaction[], categories: Category[]): Transaction[] => {
    //build array of categories to exclude
    let transactionList: Transaction[] = [];

    //exclude selected categories from array of transactions
    let filtered: Transaction[] = excludeCategories(transactions, categories);

    filtered.forEach(transaction => {
        //if transaction has data, and does not contain exclude category, add to filtered
        if(Object.keys(transaction).length > 1){
            //if each field exists, retun value, else return empty string 
            //transaction type must be either debit/credit
            transactionList.push({
                'Date': transaction['Date'] ? transaction['Date'] : '',
                'Description': transaction['Description'] ? transaction['Description'] : '',
                'Amount': transaction['Amount'] ? transaction['Amount'] : '',
                'Transaction Type': transaction['Transaction Type'],
                'Category': transaction['Category'] ? transaction['Category'] : '',
            })
        } 
    })
    
    return transactionList;
}

//build array containing sorted transactions dates
export const buildDateRange = (data: Transaction[]): string[] => {
    //create sorted array containing all transaction dates
    let dates: Date[] = [];
    data.map(d => dates.push(new Date(d['Date'])))
    dates.sort((a: Date, b: Date) => a.valueOf() - b.valueOf());

    //pull out first and last date for range
    let dateRange = [dates[0], dates[dates.length - 1]];

    //clean up date formatting in MM/DD/YYYY format
    let cleanedDates: string[] = [];
    dateRange.forEach(date => {
        //handle year
        let year = date.getFullYear();

        //handle month
        let month = ((1 + date.getMonth()).toString());
        month = (month.length > 1) 
                    ? month 
                    : '0' + month;

        //handle day
        let day = date.getDate().toString();
        day = (day.length > 1) 
                    ? day 
                    : '0' + day;
        
        //push formatted date into new array
        cleanedDates.push(`${month}/${day}/${year}`);
    })

    return cleanedDates;
}

//clean up breakdown data to conform to bar chart
export const cleanBreakdownData = (data: Breakdown): GraphItem[] => {
    let cleanedBreakdown:GraphItem[] = [];
    Object.keys(data).forEach(key => {
        cleanedBreakdown.push({
            x: key,
            y: Math.abs(data[key]),
            scale: 0
        })
    })
    return cleanedBreakdown;
}

//build monthly data for selected category over time
export const breakdownMonth = (transactions: Transaction[], category: string): GraphItem[] => {
    //create new object 
    let summary: Summary = {};
    let graphData: GraphItem[] = [];
    //loop through transactions
    transactions.forEach(t => {
        if(t['Category'] === category){
            //split dates into MM/YYYY 
            let splitDate = t['Date'].split('/')
            let condensedDate = `${splitDate[0]}/${splitDate[2]}`;
            let amount = Number(t['Amount']);

            //if no current value, create new value, if value, add to values
            (!Object.keys(summary).includes(condensedDate))
                ? summary[condensedDate] = amount
                : summary[condensedDate] = Number(summary[condensedDate]) + amount
        }
    }) 

    //build array for x,y data
    Object.keys(summary).forEach(key => {
        graphData.push({ 
            x: key,
            y: Number(summary[key].toFixed(2)),
            scale: 0
        })
    })

    //reverse data so it sort oldest to most recent
    let data = graphData.reverse();

    //return data array
    return data;
}


//build object of all categories with active flag
export const buildCategories = (data: Transaction[]): Category[]  => {
    //create category object
    let categoryArray: string[] = [];
    let categoryObj: Category[] = []

    data.forEach(d => {
      if(!categoryArray.includes(d['Category'])) {
        var key = d['Category'];
        categoryArray.push(key)
        categoryObj.push({ 
            name: key,
            active: false 
        })
      }
    })

    return categoryObj;
}