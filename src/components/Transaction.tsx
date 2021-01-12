import React from 'react';

interface Props {
    transaction: Transaction;
}

export const Transaction: React.FC<Props> = ({ transaction }) => {
    return (
        <tr>
            {Object.keys(transaction).map((item, i) => (
                <td key={i} className="transaction-field">
                    <p>{transaction[item]}</p>
                </td>
            ))}
        </tr>
    )
}