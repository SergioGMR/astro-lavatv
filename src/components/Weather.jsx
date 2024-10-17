import { useState, useEffect } from 'react';
import { getWeather } from "../lib/weather";

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await getWeather();
            setWeather(weatherData);
        };
        fetchWeather();
    }, []);

    if (!weather) return null;

    return (
        <div
            className="text-white flex flex-col items-center"
            title={`${weather.main.temp}º`}
        >
            <img
                className="size-16"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
            />
            <span className="text-xs capitalize">{weather.name}</span>
            <span className="text-xs capitalize">{weather.weather[0].description}</span>
        </div>
    );
};

export default Weather;
