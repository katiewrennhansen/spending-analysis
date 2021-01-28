import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faChartBar, 
    faList, 
    faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';
    
export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li className="sidebar-item">
                    <NavLink exact to='/spending-analysis/'>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/spending-analysis/breakdown'>
                        <FontAwesomeIcon icon={faChartBar} /> Spending Breakdown
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/spending-analysis/monthly'>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Monthly Data
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/spending-analysis/transactions'>
                        <FontAwesomeIcon icon={faList} /> Transaction List
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}