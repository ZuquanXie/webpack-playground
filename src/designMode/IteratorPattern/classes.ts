import {Iterator} from './intercace';

export class MyMap<V> {
    constructor() {
        this.map = [];
    }

    map: [string, V][]

    setItem(key: string, value: V) {
        this.map.push([key, value]);
    }
}

export class MyArray<I> {
    constructor() {
        this.array = [];
    }

    array: I[]

    push(item: I) {
        this.array.push(item);
    }
}

export class MyMapIterator<V> implements Iterator<{key: string, value: V}> {
    constructor(map: MyMap<V>) {
        this.map = map;
        this.current = -1;
    }

    current: number;

    map: MyMap<V>

    hasNext() {
        if (this.map.map[this.current + 1] !== undefined) {
            return true;
        }
        return false;
    }

    next() {
        if (this.hasNext()) {
            const [key, value] = this.map.map[this.current++ + 1];
            return {key, value};
        }
        return null;
    }
}

export class MyArrayIterator<I> implements Iterator<I> {
    constructor(array: MyArray<I>) {
        this.current = -1;
        this.array = array;
    }

    current: number;

    array: MyArray<I>;

    hasNext() {
        if (this.array.array.length > this.current + 1) {
            return true;
        }
        return false;
    }

    next() {
        if (this.hasNext()) {
            return this.array.array[this.current++ + 1];
        }
        return null;
    }
}