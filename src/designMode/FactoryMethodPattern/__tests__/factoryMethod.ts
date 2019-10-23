import {SuperMarket} from '../classes';

test('factory-method', () => {
    const supermarket = new SuperMarket();

    expect(supermarket.order('Pencil', 1)).toEqual({name: 'Pencil', cost: 10});
    expect(supermarket.order('Pencil', 2)).toEqual({name: 'Pencil', cost: 20});
});