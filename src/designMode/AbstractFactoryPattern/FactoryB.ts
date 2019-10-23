import {AbstractIngredient, AbstractProduct, AbstractFactory} from './interface';

class ProductB implements AbstractProduct {
    constructor(ingredientFactory: AbstractIngredient) {
        this.ingredientFactory = ingredientFactory;
    }

    ingredientFactory: AbstractIngredient;
    isReady: boolean;
    name: string;
    type: string;

    prepare() {
        if (this.isReady) {
            return;
        }
        this.name = this.ingredientFactory.getName();
        this.type = this.ingredientFactory.getType();
        this.isReady = true;
    }

    getDescription() {
        if (!this.isReady) {
            return 'Not ready!';
        }
        return `${this.name} is type ${this.type}`;
    }
}

class IngredientB implements AbstractIngredient {
    getName() {
        return 'ProductB';
    }
    
    getType() {
        return 'B';
    }
}

export class FactoryB implements AbstractFactory {
    createProduct() {
        const ingredientFactory = new IngredientB();
        const product = new ProductB(ingredientFactory);

        product.prepare();

        return product;
    }
}
