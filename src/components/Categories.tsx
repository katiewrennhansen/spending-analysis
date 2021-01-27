import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    transactions: Transaction[];
    categories: Summary[];
    toggleCategory: (category: Summary) => void;
}

export const Categories: React.FC<Props> = ({ categories, toggleCategory }) => {
    return (
        <div className="category-container">
            <h2>Exclude Categories</h2>
            <div className="category-exclusion">
                {categories.map((cat, i) =>  (
                    <div 
                        key={i} 
                        className={`category-option ${cat?.active ? 'selected' : ''}`}
                        onClick={() => toggleCategory(cat)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                        <span className="category-label">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}