import {Store, Package, Goods} from './interface';

class NullGoods implements Goods {
    constructor(count: number) {
        this.name = 'null';
        this.unitPrice = 0;
        this.count = count;
    }

    name: string;
    unitPrice: number;
    count: number;

    package(): Package {
        return {name: this.name, cost: this.unitPrice * this.count};
    }
}

class PencilGoods extends NullGoods {
    constructor(count: number) {
        super(count);
        this.name = 'Pencil';
        this.unitPrice = 10;
        this.count = count;
    }
}

class TopStore implements Store {
    createGoods(name: string, count: number) {
        return new NullGoods(count);
    }

    order(name: string, count: number) {
        if (this.createGoods !== undefined) {
            const goods = this.createGoods(name, count);

            return goods.package();
        }
    }
}

export class SuperMarket extends TopStore {
    createGoods(name: string, count: number) {
        switch(name) {
            case 'Pencil':
                return new PencilGoods(count);
            default:
                throw new Error('Goods not found');
        }
    }
}
