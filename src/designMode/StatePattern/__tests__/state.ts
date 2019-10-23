import {Light} from '../classes';

test('state', () => {
    const light = new Light();

    expect(light.turnOff()).toBe('Nothing happened');
    expect(light.turnOn()).toBe('Light is ON');
    expect(light.isOn).toBeTruthy();

    expect(light.turnOn()).toBe('Nothing happened');
    expect(light.isOn).toBeTruthy();
    expect(light.turnOff()).toBe('Light is OFF');
});