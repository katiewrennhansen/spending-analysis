import React from 'react';
import { Transaction } from './Transaction'

interface Props {
    transactions: Transaction[];
}

export const TransactionsList: React.FC<Props> = ({ transactions }) => {
    return (
        <ul className="transactions-list">
            { transactions.map((transaction) => (
               <Transaction transaction={transaction} />
            ))}
        </ul>
    )
}