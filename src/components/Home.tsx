import React from 'react';
import CSVReader from 'react-csv-reader';
import { formatNumber } from '../utils/utilities';

interface Props {
    onFileLoad: (transactions: Transaction[], fileInfo: any) => void;
    transactions: Transaction[];
    dates: string[];
    summary: Summary;
    file: string;
    error: boolean;
}

export const Home: React.FC<Props> = ({ onFileLoad, transactions, dates, summary, file, error }) => {
    return (
        <div className="home">
            <h2>Welcome!</h2>
            {!transactions?.length ? <p className="error-message">Please select a CSV file to upload.</p> : null}
            
            {error ? <p className="error-message">Something went wrong. Please try again.</p> : null}

            <div className="csv-upload">
                <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={(data, fileInfo) => onFileLoad(data, fileInfo)}
                />

                <p>
                    {file 
                        ? <span className="success-message">Currently reading: <strong>{file}</strong></span> 
                        : <span>No file selected</span>
                    }
                </p>
            </div>

            {transactions?.length 
                ? <div className="home-summary">
                    <h2>{dates?.length ? `${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
                    <div className="spending-summary">
                        <div className="card">
                            <h3>Total Income +</h3>
                            <p className="green-success">${formatNumber(summary.totalIncome)}</p>
                        </div>
                        <div className="card">
                            <h3>Total Spent -</h3>
                            <p className="red-warning">${formatNumber(summary.totalSpent)}</p>
                        </div>
                        <div className="card">
                            <h3>Total Saved</h3>
                            <p className="green-success">${formatNumber(summary.totalSaved)}</p>
                        </div>
                        <div className="card">
                            <h3>Percent Saved</h3>
                            <p className={(summary.percentSaved > 50) ? 'green-success' : 'red-warning'}>{summary.percentSaved}%</p>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}