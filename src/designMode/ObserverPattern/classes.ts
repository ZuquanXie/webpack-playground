import { Subject, WeatherBoard, SubjectData, Observer } from './interface';

export class WeatherData implements Subject {
    constructor() {
        this.observers = [];
        this.data = {
            temperature: [],
            humidity: [],
            pressure: [],
        };
    }

    observers: Observer[]

    data: SubjectData

    registerObserver(observer: Observer) {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        let mode = 'find';
        for (let i = 0, l = this.observers.length; i < l; i++) {
            if (mode === 'find') {
                if (this.observers[i] === observer) {
                    mode = 'move';
                }
            } else {
                this.observers[i] = this.observers[i + 1];
            }
        }
        if (mode === 'move') {
            this.observers.length -= 1;
        }
    }

    notifyObservers() {
        for (let i = 0, l = this.observers.length; i < l; i++) {
            this.observers[i].update({...this.data});
        }
    }


    mesurementsChanged({temperature, humidity, pressure}: SubjectData) {
        this.data = {
            temperature: [...temperature],
            humidity: [...humidity],
            pressure: [...pressure]
        };
        this.notifyObservers();
    }
}

export class CurrentConditionsDisplay implements WeatherBoard {
    temperature: number;
    humidity: number;
    pressure: number;

    update(data: SubjectData) {
        const {temperature, humidity, pressure} = data;
        this.temperature = temperature[temperature.length - 1];
        this.humidity = humidity[humidity.length - 1];
        this.pressure = pressure[pressure.length - 1];
    }

    display() {}
}

export class StatisticsDisplay implements WeatherBoard {
    constructor() {
        this.max = {
            temperature: undefined,
            humidity: undefined,
            pressure: undefined,
        };
        this.min = {
            temperature: undefined,
            humidity: undefined,
            pressure: undefined,
        }
    }

    max: {
        temperature: number;
        humidity: number;
        pressure: number;
    }
    min: {
        temperature: number;
        humidity: number;
        pressure: number;
    }

    update(data: SubjectData) {
        const {min, max} = this;
        const keys = ['temperature', 'humidity', 'pressure'];
        for (let i = 0; i < 3; i++) {
            for (let j = 0, l = data[keys[i]].length; j < l; j++) {
                max[keys[i]] = Math.max(max[keys[i]], data[keys[i]][j]);
                min[keys[i]] = Math.min(min[keys[i]], data[keys[i]][j]);
            }
        }
    }

    display() {}
}

export class ForecastDisplay implements WeatherBoard {
    temperature: number;
    humidity: number;
    pressure: number;

    update(data: SubjectData) {
        const {temperature, humidity, pressure} = data;
        const t = temperature[temperature.length - 1];
        const h = humidity[humidity.length - 1];
        const p = pressure[pressure.length - 1];
        this.temperature = t && t + Math.round(Math.random() * 4 - 2);
        this.humidity = h && h + Math.round(Math.random() * 4 - 2);
        this.pressure = p && p + Math.round(Math.random() * 4 - 2);
    }

    display() {}
}