import {FlyableDuck, QuackableDuck, FlyAndQuackDuck} from '../classes';

test('duck test', () => {
    const duck1 = new FlyableDuck();
    const duck2 = new QuackableDuck();
    const duck3 = new FlyAndQuackDuck();

    expect(duck1.performFly()).toBe('fly');
    expect(duck2.performFly()).toBe('no way');
    expect(duck3.performFly()).toBe('fly');

    expect(duck1.performQuack()).toBe('...');
    expect(duck2.performQuack()).toBe('quack!quack!');
    expect(duck3.performQuack()).toBe('quack!quack!');
});