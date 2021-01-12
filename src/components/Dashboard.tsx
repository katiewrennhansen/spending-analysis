import React from 'react';
import { TransactionsList } from './TransactionsList';
import { Summary } from './Summary';

interface Props {
    transactions: Transaction[];
    totalIncome: number;
    totalSpent: number;
    breakdown: Breakdown;
}

export const Dashboard: React.FC<Props> = ({ transactions, totalIncome, totalSpent, breakdown }) => {
    return (
        <div>
            <Summary totalIncome={totalIncome} totalSpent={totalSpent} breakdown={breakdown} />
            <TransactionsList transactions={transactions} />
        </div>
    )
}