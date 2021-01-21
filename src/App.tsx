import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { TransactionsList } from './components/TransactionsList';
import { Monthly } from './components/Monthly';

import { 
  buildBreakdown, 
  excludeCategories, 
  cleanData,
  buildDateRange,
  buildSummary
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
  const [transactions, setTransactions] = useState(initialTransactions)
  const [breakdown, setBreakdown] = useState({})
  const [summary, setSummary] = useState({})
  const [dates, setDates] = useState(emptyDates)
  const [file, setFile] = useState('')

  const onFileLoad: OnFileLoad = (data: Transaction[], fileInfo) => {
    if(data){
      setFile(fileInfo.name)
      setTransactions(cleanData(data))
      createSummary(data)
    }
  }

  const createSummary: CreateSummary = (transactions: Transaction[]) => {
      // //remove all values with category of transfer from array
      let toExclude: string[] = ['Transfer', 'Credit Card Payment']
      let noTransfers = excludeCategories(transactions, toExclude)

      //set category breakdown
      let newBreakdown: Breakdown = buildBreakdown(noTransfers)
      setBreakdown(newBreakdown)

      let dateRange: string[] = buildDateRange(transactions)
      setDates(dateRange);

      let newSummary: Summary = buildSummary(noTransfers);
      setSummary(newSummary)
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
                    summary={summary}
                  />
                </Route>
                <Route path='/monthly'>
                  <Monthly 
                    transactions={transactions} 
                    dates={dates}
                    breakdown={breakdown} 
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
                    dates={dates}
                    summary={summary}
                    file={file}
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
