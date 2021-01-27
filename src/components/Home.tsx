import React from 'react';
import CSVReader from 'react-csv-reader';
import { Overview } from './Overview'
import { Categories } from './Categories'

interface Props {
    onFileLoad: (transactions: Transaction[], fileInfo: any) => void;
    toggleCategory: (category: Summary) => void;
    transactions: Transaction[];
    dates: string[];
    summary: Summary;
    file: string;
    error: boolean;
    categories: Summary[]
}

export const Home: React.FC<Props> = ({ 
    onFileLoad, 
    transactions, 
    dates, 
    summary, 
    file, 
    error, 
    categories, 
    toggleCategory 
}) => {
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
                ? <div>
                    <Categories 
                        transactions={transactions}
                        categories={categories}
                        toggleCategory={toggleCategory}
                    />
                    <Overview 
                        dates={dates} 
                        summary={summary}
                    />
                </div>
                : null
            }
        </div>
    )
}