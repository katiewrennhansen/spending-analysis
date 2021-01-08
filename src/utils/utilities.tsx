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
            .map(transaction => breakdown[category] += Number(transaction['Amount']))
        
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