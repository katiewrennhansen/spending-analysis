interface Transaction {
    'Account Name': string;
    'Amount': string;
    'Category': string;
    'Date': string;
    'Description': string;
    // 'Labels': string;
    // 'Notes': string;
    // 'Original Description': string;
    'Transaction Type': 'credit' | 'debit';
}

interface Breakdown {
    [key: string]: number;
}

type UploadData = () => void;

type OnFileLoad = (data: Transaction[], fileInfo: any) => void;

type BuildDateRange = (data: Transaction[]) => any[];

type CreateSummary = (transactions: Transaction[]) => void;

type BuildBreakdown = (transactions: Transaction[]) => Breakdown;

type CalculateTotals = (transactions: Transaction[], type: 'credit' | 'debit') => number;

type ExcludeValues = (transactions: Transaction[], exclude: string[]) => any;

type CleanData = (transactions: Transaction[]) => Transactions[];

type ObjectKeys<T> = 
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never;

interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}