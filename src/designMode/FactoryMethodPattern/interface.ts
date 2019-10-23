export interface Goods {
    name: string;
    unitPrice: number;
    count: number;
    package: () => Package;
}

export interface Package {
    name: string;
    cost: number;
}

export interface Store {
    createGoods?: (name: string, count: number) => Goods;
    order: (name: string, count: number) => Package;
}
