import React from 'react';

interface Props {
    breakdown: Breakdown;
    summary: Summary;
}

export const Summary: React.FC<Props> = ({ breakdown, summary }) => {
    return (
        <div className="dashboard-summary">
            <div className="summary">
                { Object.keys(breakdown)
                    .sort((a, b) => breakdown[a] - breakdown[b])
                    .map((item, i) => (
                        <div className="card" key={i}>
                            <h3>{item}</h3>
                            <p className="red-warning">${Math.abs(breakdown[item]).toFixed(2)}</p>
                            <p>{(((Math.abs(breakdown[item])) / summary.totalIncome) * 100).toFixed(2)}% of total income</p>
                        </div>
                ))}
            </div>
        </div>
    );
};