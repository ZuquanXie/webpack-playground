import {Command} from './interface';

class SellActions {
    constructor(outputer: (result: string) => void) {
        this.outputer = outputer;
    }

    outputer: (result: string) => void;

    sellBook() {
        this.outputer('A book');
    }

    sellPencil() {
        this.outputer('A pencil');
    }
}

class SellABook implements Command {
    constructor(actions: SellActions) {
        this.actions = actions;
    }

    actions: SellActions

    execute() {
        this.actions.sellBook();
    }
}

class SellAPencil implements Command {
    constructor(actions: SellActions) {
        this.actions = actions;
    }

    actions: SellActions

    execute() {
        this.actions.sellPencil();
    }
}

class Waiter {
    constructor() {
        this.orders = [];
    }

    orders: Command[];

    takeOrder(order: Command) {
        this.orders.push(order);
    }

    placeOrder() {
        for (let i = 0, l = this.orders.length; i < l; i++) {
            this.orders[i].execute();
        }
        this.orders = [];
    }
}

class Customer {
    constructor() {
        this.requests = [];
    }

    requests: Command[];
}

class BookStore {
    constructor() {
        this.waiters = [];
    }

    waiters: Waiter[];

    employWaiter() {
        const newWaiter = new Waiter();

        this.waiters.push(newWaiter);
    }
}