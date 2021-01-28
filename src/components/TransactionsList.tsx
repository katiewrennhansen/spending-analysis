import React, { useState, useEffect } from 'react';
import { Transaction } from './Transaction'

interface Props {
    transactions: Transaction[];
    dates: string[];
}

export const TransactionsList: React.FC<Props> = ({ transactions, dates }) => {
    let [page, setPage] = useState(1);
    let [perPageStart, setPerPageStart] = useState(0);
    let [perPageEnd, setPerPageEnd] = useState(20);

    const prevPage = (): void => {
        if(page > 0){
            let newPage = page--;
            console.log(newPage)
            setPage(newPage);

            let pageStart = newPage * 20;
            let pageEnd = perPageStart;

            console.log(pageStart)
            console.log(pageEnd)

            setPerPageStart(pageStart)
            setPerPageEnd(pageEnd)
        }
    }

    const nextPage = (): void => {
        if(page > 0){
            let newPage = page++;
            setPage(newPage);

            let pageStart = (perPageStart + 20) * newPage
            let pageEnd = pageStart + 20

            setPerPageStart(pageStart)
            setPerPageEnd(pageEnd)
        }
    }

    useEffect(() => {
    }, [page])
 
 
    return (
        <div className="transactions-list">
            <h2>Transaction List{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
            <p>Showing {transactions?.length ? transactions.length : '0'} transaction{transactions.length !== 1 ? 's' : ''}</p>
            <button id="prev-btn" onClick={() => prevPage()}>Previous</button>
            <button id="next-btn" onClick={() => nextPage()}>Next</button>
            { transactions?.length
                ? <table className="transactions-table">
                    <thead>
                        <tr>
                            {(transactions?.length > 0) && Object.keys(transactions[0]).map((item, i) => (
                                <th key={i}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, i) => (
                            (i > perPageStart && i <= perPageEnd) && 
                            <Transaction 
                                key={i} 
                                transaction={transaction} 
                            />
                        ))}
                    </tbody>
                </table>
                : <p className="error-message">There is no data available. Please upload a CSV to view your transactions list.</p>
            }
        </div>
    )
}