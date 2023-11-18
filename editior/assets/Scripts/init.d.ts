type Table = {
    [key: string]: any;
};
declare var config:Table;
declare var game:Table;

type VoidCallback = () => {};
type AnyCallback = (...args: any[]) => void;