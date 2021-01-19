import React from 'react';
import { BreakdownBarChart } from './BreakdownBarChart';
import { Summary } from './Summary';

interface Props {
    breakdown: Breakdown;
    dates: string[];
}

export const Dashboard: React.FC<Props> = ({ breakdown, dates }) => {
    return (
        <div>
            <h2>Spending Breakdown{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
            { dates?.length
               ? <div>
                    <BreakdownBarChart breakdown={breakdown} />
                    <Summary breakdown={breakdown} />
                </div>
                : <p>There is no data available. Please upload a CSV to view spending summary.</p>
            }
        </div>
    )
}