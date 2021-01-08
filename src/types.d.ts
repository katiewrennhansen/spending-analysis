interface Transaction {
    'Account Name': string;
    'Amount': string;
    'Category': string;
    'Date': string;
    'Description': string;
    'Labels': string;
    'Notes': string;
    'Original Description': string;
    'Transaction Type': string;
}

interface Breakdown {
    [key: string]: number;
}

type UploadData = () => void;

type CreateSummary = (transactions: Transactions[]) => void;

type BuildBreakdown = (transactions: Transactions[]) => Breakdown;

type CalculateTotals = (transactions: Transactions[], type: 'credit' | 'debit') => number;

type ExcludeValues = (transactions: Transaction[], exclude: string[]) => any;

type ObjectKeys<T> = 
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never;

interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}