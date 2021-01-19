import React from 'react';

interface Props {
    breakdown: Breakdown;
}

export const Summary: React.FC<Props> = ({ breakdown }) => {
    return (
        <div className="summary">
            <h3>Spending Breakdown</h3>
            { Object.keys(breakdown).map((item, i) => (
                <p key={i}>
                    <strong>{item}:</strong>
                    {` $${Math.abs(breakdown[item]).toFixed(2)}`}
                </p>
            ))}
        </div>
    );
};