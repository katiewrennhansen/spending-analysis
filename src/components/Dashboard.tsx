import React from 'react';
import { BreakdownBarChart } from './BreakdownBarChart';
import { Summary } from './Summary';

interface Props {
    breakdown: Breakdown;
    dates: string[];
    summary: Summary;
}

export const Dashboard: React.FC<Props> = ({ breakdown, dates, summary }) => {
    return (
        <div>
            <h2>Spending Breakdown{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
            { dates?.length
               ? <div>
                    <BreakdownBarChart breakdown={breakdown} />
                    <Summary breakdown={breakdown} summary={summary}/>
                </div>
                : <p>There is no data available. Please upload a CSV to view spending breakdown.</p>
            }
        </div>
    )
}