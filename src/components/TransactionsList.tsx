import React from 'react';
import { Transaction } from './Transaction'

interface Props {
    transactions: Transaction[];
}

export const TransactionsList: React.FC<Props> = ({ transactions }) => {
    return (
        <div className="transactions-list">
            <h2>Transaction List</h2>
            <table className="transactions-table">
                <thead>
                    <tr>
                        { (transactions?.length > 0) && Object.keys(transactions[0]).map((item, i) => (
                            <th key={i}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                { transactions.map((transaction, i) => (
                    <Transaction key={i} transaction={transaction} />
                ))}
                </tbody>
            </table>
        </div>
    )
}