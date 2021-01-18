import React from 'react';
import { NavLink } from 'react-router-dom';


export const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li className="sidebar-item">
                    <NavLink exact to='/'>Home</NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/breakdown'>Spending Breakdown</NavLink>
                </li>
                <li className="sidebar-item">
                    <NavLink to='/transactions'>Transaction List</NavLink>
                </li>
            </ul>
        </aside>
    )
}