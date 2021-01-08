import React, {useState} from 'react';

interface Props {
    totalIncome: number;
    totalSpent: number;
    breakdown: Breakdown;
}

export const Summary: React.FC<Props> = ({ totalIncome, totalSpent, breakdown }) => {
    return (
        <div>
            <h2>Summary</h2>
            <div>{`Total Income: ${totalIncome}`}</div>
            <div>{`Total Spent: ${totalSpent}`}</div>
            <h3>Spending Breakdown</h3>
            { Object.keys(breakdown).map((item, i) => (
                <p key={i}>{`${item}: ${breakdown[item]}`}</p>
            ))}
        </div>
    );
};