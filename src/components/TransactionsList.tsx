import React, { useState, useEffect } from 'react';
import { Transaction } from './Transaction'
import { Toolbar } from './Toolbar'

interface Props {
    transactions: Transaction[];
    dates: string[];
}

export const TransactionsList: React.FC<Props> = ({ transactions, dates }) => {
    const [page, setPage] = useState(1);
    const [perPageStart, setPerPageStart] = useState(0);
    const [perPageEnd, setPerPageEnd] = useState(20);

    //calculate number of total pages
    const totalPages = Math.ceil(transactions.length / 20);

    //paginate to the next page
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

    //paginate to previous page
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
        //run re-render on page change
    }, [page])
 
    return (
        <div className="transactions-list">
            <h2>Transaction List{dates?.length ? `: ${dates[0]} - ${dates[1]}` : ''}</h2>
            <Toolbar 
                transactions={transactions}
                totalPages={totalPages}
                perPageStart={perPageStart}
                perPageEnd={perPageEnd}
                nextPage={nextPage}
                prevPage={prevPage}
                page={page}
            />
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
};