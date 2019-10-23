import { FlyBehavior, QuackBehavior } from "./interface";

/* behavior class */
class FlyWithWings implements FlyBehavior {
    fly() {
        return 'fly';
    }
}

class FlyNoWay implements FlyBehavior {
    fly() {
        return 'no way';
    }
}

class Quack implements QuackBehavior {
    quack() {
        return 'quack!quack!';
    }
}

class Squeak implements QuackBehavior {
    quack() {
        return 'squeak!squeak!';
    }
}

class MuteQuack implements QuackBehavior {
    quack() {
        return '...';
    }
}

class Duck {
    flyBehavior: FlyBehavior;

    quackBehavior: QuackBehavior;

    display(): void {
    }

    performFly() {
        return this.flyBehavior.fly();
    }

    performQuack() {
        return this.quackBehavior.quack();
    }
}

/* composition */
export class FlyableDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyWithWings();
        this.quackBehavior = new MuteQuack();
    }
}

export class QuackableDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyNoWay();
        this.quackBehavior = new Quack();
    }
}

export class FlyAndQuackDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyWithWings();
        this.quackBehavior = new Quack();
    }
}