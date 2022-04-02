import React from 'react';

import axios from 'axios';

import { WeatherFields } from '../models/weather';

const useWeather = (lat?: number, lon?: number): { weatherData: WeatherFields | undefined; isLoading: boolean } => {
    const [weatherData, setWeatherData] = React.useState<WeatherFields>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!lat && !lon) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get<WeatherFields>(
                    `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER}`,
                );
                setWeatherData(res.data);
                setIsLoading(false);
            } catch (err) {
                throw err;
            }
        };

        fetchData();
    }, [lat, lon]);

    return { weatherData, isLoading };
};

export { useWeather };
