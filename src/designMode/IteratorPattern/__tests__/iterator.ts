import {MyMap, MyArray, MyMapIterator, MyArrayIterator} from '../classes';

test('iterator', () => {
    const map = new MyMap<number>();
    const array = new MyArray<number>();
    const mapIterator = new MyMapIterator(map);
    const arrayIterator = new MyArrayIterator(array);

    map.setItem('one', 1);
    map.setItem('two', 2);
    map.setItem('three', 3);
    array.push(1);
    array.push(2);
    array.push(3);

    expect(mapIterator.next()).toEqual({key: 'one', value: 1});
    expect(mapIterator.next()).toEqual({key: 'two', value: 2});
    expect(mapIterator.next()).toEqual({key: 'three', value: 3});
    expect(mapIterator.next()).toBeNull();

    expect(arrayIterator.next()).toBe(1);
    expect(arrayIterator.next()).toBe(2);
    expect(arrayIterator.next()).toBe(3);
    expect(arrayIterator.next()).toBeNull();
});