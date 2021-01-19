//build category breakdown
export const buildBreakdown: BuildBreakdown = (transactions: Transaction[]) => {
    let categories: string[] = [];
    let breakdown: Breakdown = {};

    //build array of categories
    transactions.map(transaction => (!categories.includes(transaction['Category'])) ? categories.push(transaction['Category']) : null)

    //break out spending into cateogries
    categories.forEach(category => {
        breakdown[category] = 0;
        transactions
            .filter(transaction => transaction['Category'] === category)
            .map(transaction => {
                if(transaction['Transaction Type'] === 'credit') breakdown[category] += Number(transaction['Amount'])
                else breakdown[category] -= Number(transaction['Amount'])
            })
        
        let totalValue = Number(breakdown[category].toFixed(2))
        if(totalValue < 0) breakdown[category] = totalValue;
        else delete breakdown[category]
    })

    return breakdown;
  } 

//caculate total credit/debit on account per month
export const calculateTotals: CalculateTotals = (transactions: Transaction[], type: 'credit' | 'debit')  => {
    let totalSpent: number = 0;
    transactions.map(transaction => {
        if(transaction['Transaction Type'] === type){
            totalSpent += Number(transaction['Amount'])
        }
    })
    return Number(totalSpent.toFixed(2));
}

//exclude select categories from transactions array
export const excludeCategories: ExcludeValues = (transactions: Transaction[], exclude: string[]) => {
    let filtered = transactions.filter(transaction => {
        if(!exclude.includes(transaction['Category'])){
            return transaction;
        }
    })
    return filtered;
}

//exclude select fields from transactions array
export const cleanData: CleanData = (transactions: Transaction[]) => {
    let filtered = transactions.map(transaction => {
        return {
            'Date': transaction['Date'],
            'Account Name': transaction['Account Name'],
            'Description': transaction['Description'],
            'Amount': transaction['Amount'],
            'Transaction Type': transaction['Transaction Type'],
            'Category': transaction['Category'],
        }
    })
    return filtered;
}

//build array containing sorted transactions dates
export const buildDateRange: BuildDateRange = (data: Transaction[]) => {
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
