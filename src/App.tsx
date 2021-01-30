import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { TransactionsList } from './components/TransactionsList';
import { Monthly } from './components/Monthly';
import { 
  buildBreakdown, 
  buildCategories,
  buildDateRange,
  buildSummary,
  cleanData,
  excludeCategories
} from './utils/dataManupulation';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/App.css';

//initial state variables
const initialTransactions: Transaction[] = [];
const emptyDates: string[] = [];
const emptyCategories: Category[] = [];

export const App: React.FC<{}> = () => {
  const [initial, setInitial] = useState(initialTransactions);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [breakdown, setBreakdown] = useState({});
  const [summary, setSummary] = useState({});
  const [dates, setDates] = useState(emptyDates);
  const [file, setFile] = useState('');
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(emptyCategories);

  //build data on file load
  const onFileLoad = (data: Transaction[], fileInfo: FileInfo): void => {
    if(data && fileInfo){
      //set active file name
      setFile(fileInfo.name)

      //remove extraneous fields from transations object
      const cleanedData = cleanData(data, categories)
      setTransactions(cleanedData)
      
      //set initial category array - duplicated to preserve original list
      setInitial(cleanedData)

      //create category object
      let categoryObj = buildCategories(cleanedData)
      setCategories(categoryObj)

      //build spending summary from transaction data
      createSummary(cleanedData)
    } else {
      //set error status to true
      setError(true)
    }
  };

  //function for toggling active category
  const toggleCategory = (category: Category) : void => {
    let toggledCategories: Category[] = [];
  
    categories.forEach(cat => 
      (cat.name === category.name)
        ? toggledCategories.push({
          ...cat,
          active: (cat.active) ? false : true
        })
        : toggledCategories.push(cat)
    )
    setCategories(toggledCategories)

    //exclude categories from filtered data
    const cleanedData = excludeCategories(initial, toggledCategories)
    setTransactions(cleanedData)

    //build spending summary from transaction data
    createSummary(cleanedData)
  };

  //create spending summary (breakdown, date range, summary)
  const createSummary = (transactions: Transaction[]): void => { 
      //set category breakdown
      let newBreakdown = buildBreakdown(transactions)
      setBreakdown(newBreakdown)

      //build date range
      let dateRange = buildDateRange(transactions)
      setDates(dateRange);

      //create summary object
      let newSummary = buildSummary(transactions);
      setSummary(newSummary)
  };

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
};

export default App;
