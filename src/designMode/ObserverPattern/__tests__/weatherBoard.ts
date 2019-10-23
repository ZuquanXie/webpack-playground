import {WeatherData, CurrentConditionsDisplay, StatisticsDisplay, ForecastDisplay} from '../classes';

const getTemperature = (): number[] => {
    const result = new Array(5);

    for (let i = 0; i < 5; i++) {
        result[i] = 10 + Math.round(Math.random() * 30);
    }

    return result;
};

const getHumidity = (): number[] => {
    const result = new Array(5);

    for (let i = 0; i < 5; i++) {
        result[i] = 30 + Math.round(Math.random() * 50);
    }

    return result;
};

const getPressure = (): number[] => {
    const result = new Array(5);

    for (let i = 0; i < 5; i++) {
        result[i] = 70 + Math.round(Math.random() * 40);
    }

    return result;
};

test('weather board', () => {
    const weatherData = new WeatherData();
    const currentConditions = new CurrentConditionsDisplay();
    const statistics = new StatisticsDisplay();
    const forecast = new ForecastDisplay();
    let temperature = getTemperature();
    let humidity = getHumidity();
    let pressure = getPressure();

    weatherData.registerObserver(currentConditions);
    weatherData.registerObserver(statistics);
    weatherData.registerObserver(forecast);
    weatherData.mesurementsChanged({temperature, humidity, pressure});

    expect(currentConditions.temperature).toBe(temperature[temperature.length - 1]);
    expect(currentConditions.humidity).toBe(humidity[humidity.length - 1]);
    expect(currentConditions.pressure).toBe(pressure[pressure.length - 1]);
});