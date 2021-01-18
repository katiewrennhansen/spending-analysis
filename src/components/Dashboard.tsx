import React from 'react';
import { BreakdownBarChart } from './BreakdownBarChart';
import { Summary } from './Summary';

interface Props {
    totalIncome: number;
    totalSpent: number;
    breakdown: Breakdown;
}

export const Dashboard: React.FC<Props> = ({ totalIncome, totalSpent, breakdown }) => {
    return (
        <div>
            <h2>Spending Summary</h2>
            <BreakdownBarChart breakdown={breakdown} />
            <Summary totalIncome={totalIncome} totalSpent={totalSpent} breakdown={breakdown} />
        </div>
    )
}