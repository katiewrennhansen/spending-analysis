import React from 'react';
import CSVReader from 'react-csv-reader';


interface Props {
    onFileLoad: OnFileLoad;
    transactions: Transaction[];
}

export const Home: React.FC<Props> = ({ onFileLoad, transactions }) => {
    return (
        <div>
            <h2>Welcome!</h2>
            { !transactions?.length ? <p>Please select a file to upload</p> : null}
            <CSVReader
                parserOptions={{ header: true }}
                onFileLoaded={(data, fileInfo) => onFileLoad(data, fileInfo)}
            />
        </div>
    )
}