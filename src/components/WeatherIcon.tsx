import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCloud, faCloudRain, faSun, faSnowflake, faSmog } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const WeatherIcon = ({ image }: { image: string | undefined }): JSX.Element => {
    const [weatherImage, setWeatherImage] = React.useState<IconProp>();
    React.useEffect(() => {
        switch (image) {
            case 'Thunderstorm':
                setWeatherImage(faBolt);
                break;
            case 'Clouds' || 'Scattered Clouds' || 'Broken Clouds' || 'Few Clouds':
                setWeatherImage(faCloud);
                break;
            case 'Rain' || 'Shower Rain':
                setWeatherImage(faCloudRain);
                break;
            case 'Clear':
                setWeatherImage(faSun);
                break;
            case 'Snow':
                setWeatherImage(faSnowflake);
                break;
            case 'Mist':
                setWeatherImage(faSmog);
                break;
        }
    }, [image]);
    return <>{weatherImage ? <FontAwesomeIcon icon={weatherImage} /> : null}</>;
};

export default WeatherIcon;
