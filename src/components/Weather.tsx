import React from 'react';
import styled from 'styled-components';

import { Container, Stack, Typography } from '@mui/material';

import Icon from '../components/WeatherIcon';

import { Coordinates } from '../models/coordinates';
import { WeatherFields } from '../models/weather';

import { ConvertToDay } from '../utilities/ConvertDate';

import { GetWeather } from '../queries/OpenWeather';

const Weather = ({ location }: { location?: Coordinates }): JSX.Element => {
    const [weatherData, setWeatherData] = React.useState<WeatherFields>();
    const [currentTemp, setCurrentTemp] = React.useState<number>();
    const [currentWeatherIcon, setCurrentWeatherIcon] = React.useState<string>();

    const collectOpenWeatherData = () => {
        GetWeather(location?.latitude, location?.longitude).then((res) => {
            setWeatherData(res);
        });
    };

    React.useEffect(() => {
        if (location?.latitude) {
            collectOpenWeatherData();
        }
    }, [location]);

    React.useEffect(() => {
        if (weatherData) {
            setCurrentTemp(weatherData?.current.temp);
            setCurrentWeatherIcon(weatherData?.current?.weather[0].main);
            weatherData?.daily.splice(7, 1);
        }
    }, [weatherData]);

    return (
        <WeatherContainer>
            <CurrentConditions direction="row" spacing={2}>
                <Icon image={currentWeatherIcon} />
                <Typography>{`${currentTemp}°C`}</Typography>
            </CurrentConditions>
            <UpcomingWeather direction="row" spacing={1}>
                {weatherData?.daily.map((element, index) => {
                    return (
                        <Typography key={index}>
                            {ConvertToDay(element.dt)} {`${Math.round(element.temp.day)}°C`}
                        </Typography>
                    );
                })}
            </UpcomingWeather>
        </WeatherContainer>
    );
};

const WeatherContainer = styled(Container)``;

const CurrentConditions = styled(Stack)``;

const UpcomingWeather = styled(Stack)``;

export default Weather;
