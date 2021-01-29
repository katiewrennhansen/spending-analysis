import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChevronLeft, 
    faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

interface Props {
    transactions: Transaction[];
    totalPages: number;
    perPageStart: number;
    perPageEnd: number;
    page: number;
    nextPage: () => void;
    prevPage: () => void;
}

export const Toolbar: React.FC<Props> = ({ 
    totalPages, 
    perPageStart, 
    perPageEnd, 
    page,
    transactions, 
    prevPage, 
    nextPage 
}) => {
    //calculate total number of transactions
    let total = transactions?.length ? transactions.length : 0;
    
    return (
        <div className="transaction-toolbar">
            <p>
                Showing 
                {(totalPages > 1) && 
                    ` ${perPageStart + 1} - ${
                        (perPageEnd > total) 
                            ? total
                            : perPageEnd} of`
                }
                {` ${total}`} transaction{total !== 1 ? 's' : ''}
            </p>
            {transactions?.length 
                ? <div className="pagination">
                    <button 
                        className="prev-btn btn" 
                        onClick={() => prevPage()
                    }>
                        <FontAwesomeIcon 
                            icon={faChevronLeft} 
                            className="icon"
                        />
                        Prev
                    </button>

                    <p>Page {page} of {totalPages}</p>

                    <button 
                        className="next-btn btn" 
                        onClick={() => nextPage()
                    }>
                        Next
                        <FontAwesomeIcon 
                            icon={faChevronRight} 
                            className="icon"
                        />
                    </button>
                </div>
                : null
            }
        </div>
    )
}