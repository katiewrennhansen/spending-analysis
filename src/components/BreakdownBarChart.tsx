import React, { useEffect } from 'react';
import { 
    buildGraph, 
    cleanBreakdownData 
} from '../utils/utilities';

interface Props {
    breakdown: Breakdown;
}

export const BreakdownBarChart: React.FC<Props> = ({ breakdown }) => {
    useEffect(() => {
        if(!breakdown){
            return;
        } else {
            //build breakdown object to match x/y format
            let cleanedBreakdown = cleanBreakdownData(breakdown)
            //build data visualization
            buildGraph(cleanedBreakdown, 'spending-breakdown', false)
        }
    }, [breakdown])
   
    return (
        <div className='bar-chart'>
            { breakdown
                ? null
                : <div>Sorry, no data currently available.</div>
            }
            <svg className='spending-breakdown' width={900} height={500}></svg>
        </div>
    );
  }