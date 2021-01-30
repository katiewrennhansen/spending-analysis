import React, { useEffect } from 'react';
import { buildGraph } from '../utils/utilities';
import { cleanBreakdownData } from '../utils/dataManupulation';

interface Props {
    breakdown: Breakdown;
}

export const BreakdownBarChart: React.FC<Props> = ({ breakdown }) => {
    useEffect(() => {
        if(!breakdown){
            return;
        } else {
            //build breakdown object to match x/y format
            let cleanedBreakdown: GraphItem[] = cleanBreakdownData(breakdown);
            //build data visualization
            buildGraph(cleanedBreakdown, 'spending-breakdown', false);
        };
    }, [breakdown]);
   
    return (
        <div className='bar-chart'>
            <svg className='spending-breakdown' preserveAspectRatio="xMinYMin meet" viewBox="0 0 1040 680"></svg>
        </div>
    );
};