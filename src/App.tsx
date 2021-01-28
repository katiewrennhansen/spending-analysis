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
const emptyArray: any[] = [];

export const App: React.FC<{}> = () => {
  const [initial, setInitial] = useState(initialTransactions)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [breakdown, setBreakdown] = useState({})
  const [summary, setSummary] = useState({})
  const [dates, setDates] = useState(emptyArray)
  const [file, setFile] = useState('')
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState(emptyArray)

  //build data on file load
  const onFileLoad = (data: Transaction[], fileInfo: any): void => {
    if(data){
      setFile(fileInfo.name)

      //remove extraneous fields from transations object
      const cleanedData = cleanData(data, categories)
      setTransactions(cleanedData)
      
      //set initial category array - duplicated to preserve original list
      setInitial(cleanedData)

      //build spending summary from transaction data
      createSummary(cleanedData)

      let categoryArray: string[] = [];
      let categoryObj: Summary[] = []

      cleanedData.forEach(transaction => {
        if(!categoryArray.includes(transaction['Category'])) {
          var key = transaction['Category'];
          categoryArray.push(key)
          categoryObj.push({ 
              name: key,
              active: false 
          })
        }
      })

      setCategories(categoryObj)

    } else {
      //set error status to true
      setError(true)
    }
  }

  const toggleCategory = (category: Summary): void => {
    let toggledCategories: Summary[] = []
  
    categories.forEach(cat => {
      if(cat.name === category.name){
        toggledCategories.push({
          ...cat,
          active: (cat.active) ? false : true
        })
      } else {
        toggledCategories.push(cat)
      }
    })

    setCategories(toggledCategories)

    const cleanedData = cleanData(initial, toggledCategories)
    setTransactions(cleanedData)

    //build spending summary from transaction data
    createSummary(cleanedData)
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
                <Route path='/spending-analysis/breakdown'>
                  <Dashboard 
                    breakdown={breakdown} 
                    dates={dates}
                    summary={summary}
                  />
                </Route>
                <Route path='/spending-analysis/monthly'>
                  <Monthly 
                    transactions={transactions} 
                    dates={dates}
                    breakdown={breakdown} 
                  />
                </Route>
                <Route path='/spending-analysis/transactions'>
                  <TransactionsList 
                    transactions={transactions} 
                    dates={dates}
                  />
                </Route>
                <Route path="/">
                  <Home 
                    onFileLoad={onFileLoad} 
                    transactions={transactions} 
                    dates={dates}
                    summary={summary}
                    file={file}
                    error={error}
                    categories={categories}
                    toggleCategory={toggleCategory}
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
