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
  cleanData 
} from './utils/utilities';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

const initialTransactions: Transaction[] = [];


export const App: React.FC<{}> = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [breakdown, setBreakdown] = useState({})

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
  }

  useEffect(() => {
  }, [totalIncome, totalSpent, breakdown])


  return (
    <Router>
      <div className="main">
        <Header />

        <div className="main-container">
          <Sidebar />

          <main className="dashboard-container">
            <Switch>
                <Route path='/breakdown'>
                  <Dashboard totalIncome={totalIncome} totalSpent={totalSpent} breakdown={breakdown}/>
                </Route>
                <Route path='/transactions'>
                  <TransactionsList transactions={transactions} />
                </Route>
                <Route exact path="/">
                  <Home onFileLoad={onFileLoad} transactions={transactions}/>
                </Route>
              </Switch>
            </main>
          </div>
      </div>
    </Router>
  );
}

export default App;
