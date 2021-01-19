import React from 'react';
import { Transaction } from './Transaction'

interface Props {
    transactions: Transaction[];
    dates: string[];
}

export const TransactionsList: React.FC<Props> = ({ transactions, dates }) => {
    return (
        <div className="transactions-list">
            <h2>Transaction List{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
            { transactions?.length
                ? <table className="transactions-table">
                    <thead>
                        <tr>
                            { (transactions?.length > 0) && Object.keys(transactions[0]).map((item, i) => (
                                <th key={i}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        { transactions.map((transaction, i) => (
                            <Transaction 
                                key={i} 
                                transaction={transaction} 
                            />
                        ))}
                    </tbody>
                </table>
                : <p>There is no data available. Please upload a CSV to view your transactions list.</p>
            }
        </div>
    )
}