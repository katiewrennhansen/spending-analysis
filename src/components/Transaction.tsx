import React from 'react';

interface Props {
    transaction: Transaction;
}

export const Transaction: React.FC<Props> = ({ transaction }) => {
    return (
        <li className="transaction">
            {Object.keys(transaction).map((item, i) => (
                <div key={i} className="transaction-field">
                    <p>{item}</p>
                    <p>{transaction[item]}</p>
                </div>
            ))}
        </li>
    )
}