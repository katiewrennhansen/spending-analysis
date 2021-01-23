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
            .map(transaction => {
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
    transactions.map(transaction => {
        //filter for all transaction of set type
        if(transaction['Transaction Type'] === type){
            //add to totalSpent
            totalSpent += Number(transaction['Amount']);
        }
    })
    return Number(totalSpent.toFixed(2));
}

//exclude select categories from transactions array
export const excludeCategories = (transactions: Transaction[], exclude: string[]): any => {
    let filtered = transactions.filter(transaction => {
        //only return transaction if it does not contain category to exclude
        if(!exclude.includes(transaction['Category'])){
            return transaction;
        }
    })
    return filtered;
}

//exclude select fields from transactions array
export const cleanData = (transactions: Transaction[]): Transaction[] => {
    let filtered = transactions.map(transaction => {
        //check if each field exists, if so retun value, else return empty string
        //transaction type must be either debit/credit
        return {
            'Date': transaction['Date'] ? transaction['Date'] : '',
            'Account Name': transaction['Account Name'] ? transaction['Account Name'] : '',
            'Description': transaction['Description'] ? transaction['Description'] : '',
            'Amount': transaction['Amount'] ? transaction['Amount'] : '',
            'Transaction Type': transaction['Transaction Type'],
            'Category': transaction['Category'] ? transaction['Category'] : '',
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
    dates.map(date => {
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