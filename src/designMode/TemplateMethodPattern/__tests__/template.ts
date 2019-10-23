import {DrawRedCircle, DrawBlueLine} from '../classes';

test('template', () => {
    const drawRedCircle = new DrawRedCircle();
    const drawBlueLine = new DrawBlueLine();

    expect(drawRedCircle.draw()).toEqual(['Pencil & Paper', 'red', 'circle', 'red', 'circle', 'Look! So beautiful!']);
    expect(drawBlueLine.draw()).toEqual(['Pencil & Paper', 'blue', 'line', undefined, undefined, 'Look! So beautiful!']);
});