interface Transaction {
    'Account Name': string;
    'Amount': string;
    'Category': string;
    'Date': string;
    'Description': string;
    'Transaction Type': 'credit' | 'debit';
}

interface Summary {
    [key: string]: any;
}

interface Breakdown {
    [key: string]: number;
}

type ObjectKeys<T> = 
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never;

interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}