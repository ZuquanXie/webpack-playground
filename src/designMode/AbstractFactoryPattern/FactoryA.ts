import {AbstractIngredient, AbstractProduct, AbstractFactory} from './interface';

class ProductA implements AbstractProduct {
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

class IngredientA implements AbstractIngredient {
    getName() {
        return 'ProductA';
    }
    
    getType() {
        return 'A';
    }
}

export class FactoryA implements AbstractFactory {
    createProduct() {
        const ingredientFactory = new IngredientA();
        const product = new ProductA(ingredientFactory);

        product.prepare();

        return product;
    }
}
