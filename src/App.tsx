import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { TransactionsList } from './components/TransactionsList';
import { Monthly } from './components/Monthly';
import { 
  buildBreakdown, 
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

  let toExclude: string[] = ['Transfer', 'Credit Card Payment']

  //build data on file load
  const onFileLoad = (data: Transaction[], fileInfo: any): void => {
    if(data){
      setFile(fileInfo.name)

      //remove extraneous fields from transations object
      const cleanedData = cleanData(data, toExclude)
      setTransactions(cleanedData)

      //build spending summary from transaction data
      createSummary(cleanedData)
    }
  }

  //create spending summary (breadown, date range, summary)
  const createSummary = (transactions: Transaction[]): void => { 
      //set category breakdown
      let newBreakdown = buildBreakdown(transactions)
      setBreakdown(newBreakdown)

      let dateRange = buildDateRange(transactions)
      setDates(dateRange);

      let newSummary = buildSummary(transactions);
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
