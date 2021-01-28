import React, { useState, useEffect } from 'react';
import { Transaction } from './Transaction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChevronLeft, 
    faChevronRight 
} from '@fortawesome/free-solid-svg-icons';

interface Props {
    transactions: Transaction[];
    dates: string[];
}

export const TransactionsList: React.FC<Props> = ({ transactions, dates }) => {
    const [page, setPage] = useState(1);
    const [perPageStart, setPerPageStart] = useState(0);
    const [perPageEnd, setPerPageEnd] = useState(20);

    const totalPages = Math.ceil(transactions.length / 20);

    const prevPage = (): void => {
        if(page > 1){
            let newPage = page - 1;
            setPage(newPage);

            let pageStart = perPageStart - 20;
            let pageEnd = perPageStart;

            setPerPageStart(pageStart)
            setPerPageEnd(pageEnd)
        }
    }

    const nextPage = (): void => {
        if(page < totalPages){
            let newPage = page + 1;
            setPage(newPage);

            let pageStart = perPageStart + 20;
            let pageEnd = pageStart + 20


            setPerPageStart(pageStart)
            setPerPageEnd(pageEnd)
        }
    }

    useEffect(() => {
    }, [page])
 
 
    return (
        <div className="transactions-list">
            <h2>Transaction List{dates?.length ? `: ${dates[0]} - ${dates[dates.length - 1]}` : ''}</h2>
            <div className="transaction-toolbar">
                <p>
                    Showing 
                    {(totalPages > 1) && 
                        ` ${perPageStart + 1} - ${
                            (perPageEnd > transactions.length) 
                                ? transactions.length 
                                : perPageEnd} of `
                    }
                    {transactions?.length 
                        ? transactions.length 
                        : '0'
                    } transaction{transactions.length !== 1 ? 's' : ''}
                </p>
                <div className="pagination">
                    <button 
                        className="prev-btn" 
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
                        className="next-btn" 
                        onClick={() => nextPage()
                    }>
                        Next
                        <FontAwesomeIcon 
                            icon={faChevronRight} 
                            className="icon"
                        />
                    </button>
                </div>
            </div>
            { transactions?.length
                ? <table className="transactions-table">
                    <thead>
                        <tr>
                            {(transactions?.length > 0) && Object.keys(transactions[0]).map((item, i) => (
                                <th key={i}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, i) => (
                            (i > perPageStart && i <= perPageEnd) && 
                            <Transaction 
                                key={i} 
                                transaction={transaction} 
                            />
                        ))}
                    </tbody>
                </table>
                : <p className="error-message">There is no data available. Please upload a CSV to view your transactions list.</p>
            }
        </div>
    )
}