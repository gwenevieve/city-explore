import React from 'react';
import axios from 'axios';

import { WeatherFields } from '../models/weather';

const GetWeather = async (lat?: number, lon?: number): Promise<WeatherFields> => {
    try {
        const res = await axios.get<WeatherFields>(
            `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER}`,
        );
        return res.data;
    } catch (err) {
        throw err;
    }
};

export { GetWeather };
