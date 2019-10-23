export interface Subject {
    registerObserver: (observer: Observer) => void;
    removeObserver: (observer: Observer) => void;
    notifyObservers: () => void;
}

export interface Observer {
    update: (data: any) => void;
}

export interface DisplayElement {
    display: () => any;
}

export interface WeatherBoard extends Observer, DisplayElement {}

export interface SubjectData {
    temperature: number[];
    humidity: number[];
    pressure: number[];
}