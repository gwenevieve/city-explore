import React from 'react';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { Container, Stack, Typography } from '@mui/material';

import Icon from './WeatherIcon';

import { Coordinates } from '../../models/coordinates';
import { WeatherFields } from '../../models/weather';

import { ConvertToDay } from '../../utilities/ConvertDate';

import { GetWeather } from '../../queries/OpenWeather';

const Weather = ({ location }: { location?: Coordinates }): JSX.Element => {
    const [weatherData, setWeatherData] = React.useState<WeatherFields>();
    const [currentTemp, setCurrentTemp] = React.useState<number>();
    const [currentWeatherIcon, setCurrentWeatherIcon] = React.useState<string>();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

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
        <WeatherContainer disableGutters>
            <CurrentConditions direction="row" mt={2} mb={3} spacing={2}>
                <Icon size="2x" image={currentWeatherIcon} />
                <Typography variant="body1">{`${currentTemp ? Math.round(currentTemp) : ''}°C`}</Typography>
            </CurrentConditions>
            <UpcomingWeather direction="row" spacing={1}>
                {weatherData?.daily.map((element) => {
                    return (
                        <UpcomingDate key={element.dt}>
                            <Typography mb={1} variant="body2">
                                {`${matches ? ConvertToDay(element.dt).substring(0, 3) : ConvertToDay(element.dt)}`}
                            </Typography>
                            <Icon size="lg" image={element?.weather[0].main} />
                            <Typography mt={1} variant="body2">{`${Math.round(element.temp.day)}°C`}</Typography>
                        </UpcomingDate>
                    );
                })}
            </UpcomingWeather>
        </WeatherContainer>
    );
};

const WeatherContainer = styled(Container)``;

const CurrentConditions = styled(Stack)``;

const UpcomingWeather = styled(Stack)`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const UpcomingDate = styled.div`
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 32px;
    border-radius: 8px;
    padding: 5px 12px;
    background-color: #f3f3f3;
`;

export default Weather;
