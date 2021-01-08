import React from 'react';

interface Props {
    transaction: Transaction;
}

export const Transaction: React.FC<Props> = ({ transaction }) => {
    return (
        <li>
            {Object.keys(transaction).map((item, i) => (
                <p key={i}>{`${item}: ${transaction[item]}`}</p>
            ))}
        </li>
    )
}