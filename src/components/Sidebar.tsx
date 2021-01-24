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
                    <NavLink exact to='/'>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/breakdown'>
                        <FontAwesomeIcon icon={faChartBar} /> Spending Breakdown
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/monthly'>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Monthly Data
                    </NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/transactions'>
                        <FontAwesomeIcon icon={faList} /> Transaction List
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}