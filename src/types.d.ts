//Define structure of transaction object
interface Transaction {
    'Amount': string;
    'Category': string;
    'Date': string;
    'Description': string;
    'Transaction Type': 'credit' | 'debit';
}

//Define summary object
interface Summary {
    [key: string]: any;
}

//Define breakdown object
interface Breakdown {
    [key: string]: number;
}

//Graph item obejct
interface GraphItem  {
    x: string | number;
    y: number;
    scale: number;
}

//Handle object.keys mapping
type ObjectKeys<T> = 
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never;

//Handle object.keys mapping
interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}