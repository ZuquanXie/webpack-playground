import { FactoryA } from '../FactoryA';
import { FactoryB } from '../FactoryB';

test('abstract factory', () => {
    const factoryA = new FactoryA();
    const factoryB = new FactoryB();

    expect(factoryA.createProduct().isReady).toBe(true);
    expect(factoryA.createProduct().name).toBe('ProductA');
    expect(factoryA.createProduct().type).toBe('A');

    expect(factoryB.createProduct().isReady).toBe(true);
    expect(factoryB.createProduct().name).toBe('ProductB');
    expect(factoryB.createProduct().type).toBe('B');
});