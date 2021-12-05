import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCloud, faCloudRain, faSun, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';

import { WeatherIconDetails } from '../../models/weather';

const WeatherIcon = ({ image }: { image: string | undefined }): JSX.Element => {
    const [weatherImage, setWeatherImage] = React.useState<WeatherIconDetails>();
    React.useEffect(() => {
        switch (image) {
            case 'Thunderstorm':
                setWeatherImage({ icon: faBolt, color: '#FF8969' });
                break;
            case 'Clouds' || 'Scattered Clouds' || 'Broken Clouds' || 'Few Clouds':
                setWeatherImage({ icon: faCloud, color: '#FF8969' });
                break;
            case 'Rain' || 'Shower Rain':
                setWeatherImage({ icon: faCloudRain, color: '#FF8969' });
                break;
            case 'Clear':
                setWeatherImage({ icon: faSun, color: '#FF8969' });
                break;
            case 'Snow':
                setWeatherImage({ icon: faSnowflake, color: '#FF8969' });
                break;
            case 'Mist':
                setWeatherImage({ icon: faSmog, color: '#FF8969' });
                break;
        }
    }, [image]);
    return (
        <>{weatherImage ? <FontAwesomeIcon size="2x" color={weatherImage.color} icon={weatherImage.icon} /> : null}</>
    );
};

export default WeatherIcon;
