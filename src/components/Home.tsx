import React from 'react';
import CSVReader from 'react-csv-reader';

interface Props {
    onFileLoad: (transactions: Transaction[], fileInfo: any) => void;
    transactions: Transaction[];
    dates: string[];
    summary: Summary;
    file: string;
}

export const Home: React.FC<Props> = ({ onFileLoad, transactions, dates, summary, file }) => {
    return (
        <div className="home">
            <h2>Welcome!</h2>
            { !transactions?.length ? <p>Please select a CSV file to upload.</p> : null}

            <div className="csv-upload">
                <CSVReader
                    parserOptions={{ header: true }}
                    onFileLoaded={(data, fileInfo) => onFileLoad(data, fileInfo)}
                />

                <p>{ file ? `Currently reading: ${file}` : 'No file selected' }</p>
            </div>

            { transactions?.length 
                ? <div className="home-summary">
                    <h2>{dates?.length ? `${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
                    <div className="spending-summary">
                        <div className="card">
                            <h3>Total Income +</h3>
                            <p className="green">${summary.totalIncome}</p>
                        </div>
                        <div className="card">
                            <h3>Total Spent -</h3>
                            <p className="red">${summary.totalSpent}</p>
                        </div>
                        <div className="card">
                            <h3>Total Saved</h3>
                            <p className="green">${summary.totalSaved}</p>
                        </div>
                        <div className="card">
                            <h3>Percent Saved</h3>
                            <p className={(summary.percentSaved > 40) ? 'green' : 'red'}>{summary.percentSaved}%</p>
                        </div>
                    </div>
                </div>
                : null
            }
           
        </div>
    )
}