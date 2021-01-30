//define structure of transaction object
interface Transaction {
    'Amount': string;
    'Category': string;
    'Date': string;
    'Description': string;
    'Transaction Type': 'credit' | 'debit';
}

//define summary object
interface Summary {
    [key: string]: number;
}

//define category object
interface Category {
    name: string;
    active: boolean;
}

//define file info object
interface FileInfo {
    name: string;
    size: number;
    type: string;
}

//define breakdown object
interface Breakdown {
    [key: string]: number;
}

//graph item obejct
interface GraphItem  {
    x: string | number;
    y: number;
    scale: number;
}

//handle object.keys mapping
type ObjectKeys<T> = 
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] :
    never;

//handle object.keys mapping
interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
}