import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimes, 
    faPlus, 
    faMinus 
} from '@fortawesome/free-solid-svg-icons';

interface Props {
    transactions: Transaction[];
    categories: Summary[];
    toggleCategory: (category: Summary) => void;
}

export const Categories: React.FC<Props> = ({ categories, toggleCategory }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const activeCat = categories.filter(cat => cat.active);

    return (
        <div className="category-container">
            <h2 
                className="pointer"
                onClick={() => showDropdown ? setShowDropdown(false) : setShowDropdown(true)}
            >
                <span>Exclude Categories ({activeCat.length})</span>
                { showDropdown 
                    ? <FontAwesomeIcon className="icon" icon={faMinus} /> 
                    : <FontAwesomeIcon className="icon" icon={faPlus} />
                }
            </h2>
            { showDropdown 
                ? <div>
                    <p>Select a category to exclude it from your list of transactions</p>
                    <div className="category-exclusion">
                        {categories.map((cat, i) =>  (
                            <div 
                                key={i} 
                                className={`category-option  pointer ${cat?.active ? 'selected' : ''}`}
                                onClick={() => toggleCategory(cat)}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                                <span className="category-label">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                : <div className="category-exclusion">
                {activeCat.map((cat, i) =>  (
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
            }
        </div>
    )
}