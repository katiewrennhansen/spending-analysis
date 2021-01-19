import React from 'react';
import CSVReader from 'react-csv-reader';


interface Props {
    totalIncome: number;
    totalSpent: number;
    onFileLoad: OnFileLoad;
    transactions: Transaction[];
    dates: string[];
}

export const Home: React.FC<Props> = ({ onFileLoad, transactions, totalIncome, totalSpent, dates }) => {
    return (
        <div className="home">
            <h2>Welcome!</h2>
            { !transactions?.length ? <p>Please select a CSV file to upload.</p> : null}

            <CSVReader
                parserOptions={{ header: true }}
                onFileLoaded={(data, fileInfo) => onFileLoad(data, fileInfo)}
            />
            { transactions?.length 
                ? <div className="home-summary">
                    <h2>{dates?.length ? `${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
                    <div className="spending-summary">
                        <div>
                            <h3>Total Income +</h3>
                            <p>${totalIncome.toFixed(2)}</p>
                        </div>
                        <div>
                            <h3>Total Spent -</h3>
                            <p>${totalSpent.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                : null
            }
           
        </div>
    )
}