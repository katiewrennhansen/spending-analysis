import React, { useState, useEffect } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { buildBreakdown, calculateTotals, excludeCategories } from './utils/utilities'

const initialTransactions: Transaction[] = [];

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [breakdown, setBreakdown] = useState({})

  const uploadData: UploadData = () => {
    if(!transactions.length){
      fetch('http://localhost:8000/')
        .then(res => res.json())
        .then(data => {
          setTransactions(data)
        })
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
      let totalSpent: number = calculateTotals(noTransfers, 'debit')
      setTotalSpent(totalSpent)

      //set category breakdown
      let newBreakdown: Breakdown = buildBreakdown(noTransfers)
      setBreakdown(newBreakdown)
  }

  useEffect(() => {
    uploadData();
    if(transactions && !totalIncome){
      createSummary(transactions);
    }
  })

  return (
    <div className="App">
      <h1>Spend Analyzer</h1>
      <button onClick={() => uploadData()}>Upload Data</button>
      <Dashboard transactions={transactions} totalIncome={totalIncome} totalSpent={totalSpent} breakdown={breakdown}/>
    </div>
  );
}

export default App;
