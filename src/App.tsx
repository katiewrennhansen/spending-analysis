import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { TransactionsList } from './components/TransactionsList';
import { 
  buildBreakdown, 
  calculateTotals, 
  excludeCategories, 
  cleanData,
  buildDateRange
} from './utils/utilities';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

const initialTransactions: Transaction[] = [];

const emptyDates: string[] = [];

export const App: React.FC<{}> = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [breakdown, setBreakdown] = useState({})
  const [dates, setDates] = useState(emptyDates)

  const onFileLoad: OnFileLoad = (data: Transaction[], fileInfo) => {
    if(data){
      setTransactions(cleanData(data))
      createSummary(data)
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

      let dateRange: string[] = buildDateRange(transactions)
      setDates(dateRange);
  }

  return (
    <Router>
      <div className="main">
        <Header />

        <div className="main-container">
          <Sidebar />

          <main className="dashboard-container">
            <Switch>
                <Route path='/breakdown'>
                  <Dashboard 
                    breakdown={breakdown} 
                    dates={dates}
                  />
                </Route>
                <Route path='/transactions'>
                  <TransactionsList 
                    transactions={transactions} 
                    dates={dates}
                  />
                </Route>
                <Route exact path="/">
                  <Home 
                    onFileLoad={onFileLoad} 
                    transactions={transactions} 
                    totalIncome={totalIncome} 
                    totalSpent={totalSpent}
                    dates={dates}
                  />
                </Route>
              </Switch>
            </main>
          </div>
      </div>
    </Router>
  );
}

export default App;
