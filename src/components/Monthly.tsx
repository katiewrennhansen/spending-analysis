import React, { useState, useEffect } from 'react';
import { 
    buildGraph, 
    breakdownMonth 
} from '../utils/utilities';

interface Props {
    transactions: Transaction[];
    dates: string[];
    breakdown: Breakdown;
}

export const Monthly: React.FC<Props> = ({ transactions, dates, breakdown }) => {
    //array of all categories in transaction list
    const categories = Object.keys(breakdown);
    //set initial category to populate dropdown & viz
    const [activeCat, setActiveCat] = useState(categories[0]);

    useEffect(() => {
        if(!transactions){
            return;
        } else {
            //if changes in activeCat or transactions, re-build visualization
            const monthlyBreakdown = breakdownMonth(transactions, activeCat);
            buildGraph(monthlyBreakdown, 'monthly-breakdown', true)
        }
    }, [transactions, activeCat])

    return (
        <div className="monthly-chart">
            <h2>Monthly Data{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 2]}` : ''}</h2>

            {transactions?.length
                ? <div> 
                    <div className="monthly-select">
                        <div className="select-container pointer">
                            <select onChange={e => {
                                const target = e.target as HTMLSelectElement;
                                const cat: any = target.value;
                                setActiveCat(cat)
                            }} 
                            value={activeCat}
                            className="monthly-dropdown">
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <span className="focus"></span>
                        </div>
                        <h3>{activeCat}</h3>
                    </div>
                    <div className="monthly-breakdown-container">
                        <svg className='monthly-breakdown' preserveAspectRatio="xMinYMin meet" viewBox="0 0 1040 660"></svg>
                    </div>
                </div>
                : <p className="error-message">There is no data available. Please upload a CSV to view monthly spending summary.</p>
            }
        </div>
    )
}