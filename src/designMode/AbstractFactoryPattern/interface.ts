export interface AbstractFactory {
    createProduct: () => AbstractProduct;
}

export interface AbstractProduct {
    ingredientFactory: AbstractIngredient;
    isReady: boolean;
    name: string;
    type: string;
    prepare: () => void;
    getDescription: () => string;
}

export interface AbstractIngredient {
    getName: () => string;
    getType: () => string;
}
