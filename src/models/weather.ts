export interface WeatherDetails {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface WeatherFields {
    current: {
        temp: number;
        weather: WeatherDetails[];
    };
    daily: [
        weather: {
            clouds: number;
            dew_point: number;
            dt: number;
            feels_like: {
                day: number;
                night: number;
                eve: number;
                morn: number;
            };
            humidity: number;
            moon_phase: number;
            moonrise: number;
            moonset: number;
            pop: number;
            pressure: number;
            sunrise: number;
            sunset: number;
            temp: {
                day: number;
                min: number;
                max: number;
                morn: number;
                night: number;
                eve: number;
            };
            uvi: number;
            weather: WeatherDetails[];
            wind_deg: number;
            wind_gust: number;
            wind_speed: number;
        },
    ];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}
