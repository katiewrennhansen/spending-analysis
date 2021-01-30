import React from 'react';
import { formatNumber } from '../utils/utilities';

interface Props {
    dates: string[];
    summary: Summary;
}

export const Overview: React.FC<Props> = ({ dates, summary }) => {
    return (
        <div className="home-summary">
            <h2>{dates?.length ? `${dates[0]} - ${dates[1]}` : ''}</h2>
            <div className="spending-summary">
                <div className="card">
                    <h3>Total Income +</h3>
                    <p className="green-success">${formatNumber(summary.totalIncome)}</p>
                </div>
                <div className="card">
                    <h3>Total Spent -</h3>
                    <p className="red-warning">${formatNumber(summary.totalSpent)}</p>
                </div>
                <div className="card">
                    <h3>Total Saved</h3>
                    <p className={formatNumber(summary.totalSaved).includes('-') ? 'red-warning' : 'green-success'}>${formatNumber(summary.totalSaved)}</p>
                </div>
                <div className="card">
                    <h3>Percent Saved</h3>
                    <p className={(summary.percentSaved > 50) ? 'green-success' : 'red-warning'}>{summary.percentSaved}%</p>
                </div>
            </div>
        </div>
    )
};