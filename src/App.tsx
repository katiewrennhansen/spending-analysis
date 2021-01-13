import React, { useState, useEffect } from 'react';
import CSVReader from 'react-csv-reader';
import { Dashboard } from './components/Dashboard';
import { buildBreakdown, calculateTotals, excludeCategories, cleanData } from './utils/utilities'
import './App.css';

const initialTransactions: Transaction[] = [];

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [breakdown, setBreakdown] = useState({})

  const onFileLoad: OnFileLoad = (data: Transaction[], fileInfo) => {
    if(data){
      setTransactions(cleanData(data))
      createSummary(data)
      // console.log(cleanData(transactions))
    }
  }

  const createSummary: CreateSummary = (transactions: Transaction[]) => {
      //remove all values with category of transfer from array
      let toExclude: string[] = ['Transfer', 'Credit Card Payment']
      let noTransfers = excludeCategories(transactions, toExclude)
      
      //calculate total amount coming into account and set state
      let totalIncome: number = calculateTotals(noTransfers, 'credit')
      setTotalIncome(totalIncome)

      //calculate total amount speant and set state
      let spent: number = calculateTotals(noTransfers, 'debit')
      setTotalSpent(spent)

      //set category breakdown
      let newBreakdown: Breakdown = buildBreakdown(noTransfers)
      setBreakdown(newBreakdown)
  }

  useEffect(() => {
  }, [totalIncome, totalSpent, breakdown])


  return (
    <div className="App">
      <h1>Spend Analyzer</h1>
      <CSVReader
        parserOptions={{ header: true }}
        onFileLoaded={(data, fileInfo) => onFileLoad(data, fileInfo)}
      />
      <Dashboard transactions={transactions} totalIncome={totalIncome} totalSpent={totalSpent} breakdown={breakdown}/>
    </div>
  );
}

export default App;
