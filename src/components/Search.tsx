import React from 'react';
import styled from 'styled-components';

import { Container } from '@mui/material';

import { Coordinates } from '../models/coordinates';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const SearchBar = ({
    setLocation,
    setLocationName,
}: {
    setLocation: React.Dispatch<React.SetStateAction<Coordinates | undefined>>;
    setLocationName: React.Dispatch<React.SetStateAction<string | undefined>>;
}): JSX.Element => {
    const [isResultLoaded, setIsResultLoaded] = React.useState<boolean>(false);

    const Geocoder = new MapboxGeocoder({
        accessToken: `${process.env.REACT_APP_MAPBOX}`,
        types: 'region,place',
        placeholder: 'Search for a city...',
        minLength: 3,
        countries: 'ca',
    });

    React.useEffect(() => {
        Geocoder.addTo('#geocoder-container');
    }, []);

    Geocoder.on('result', function (e) {
        console.log(e);
        if (e && e.result) {
            setLocation({
                latitude: e.result.geometry.coordinates[1],
                longitude: e.result.geometry.coordinates[0],
            });
            let cleanedRegionName;
            e.result.context.forEach((element: any) => {
                if (element.id.substr(0, element.id.lastIndexOf('.')) === 'region') {
                    console.log(element.short_code);
                    cleanedRegionName = element.short_code.replace('CA-', '');
                }
            });

            setLocationName(`${e.result.text}, ${cleanedRegionName}`);
            setIsResultLoaded(true);
        }
    });

    return !isResultLoaded ? (
        <SearchContainer maxWidth="sm">
            <GeocodeSearch
                onKeyDown={(event: React.KeyboardEvent) => {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                }}
                id="geocoder-container"
            />
        </SearchContainer>
    ) : (
        <></>
    );
};

const SearchContainer = styled(Container)``;

const GeocodeSearch = styled.div`
    position: absolute;
    top: 35%;
    left: 0;
    right: 0;
    .mapboxgl-ctrl {
        width: 90%;
        margin: 0 auto;
        max-width: 500px;
        @media screen and (min-width: 600px) {
            width: 100%;
        }
        .suggestions {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid #f3f3f3;
            top: calc(100%);
            box-shadow: 0 1px 2px rgba(255, 137, 105, 0.07), 0 2px 4px rgba(255, 137, 105, 0.07),
                0 4px 8px rgba(255, 137, 105, 0.07), 0 8px 16px rgba(255, 137, 105, 0.07),
                0 16px 32px rgba(255, 137, 105, 0.07), 0 32px 64px rgba(255, 137, 105, 0.07);
        }
        &-geocoder--input {
            @media screen and (min-width: 600px) {
                height: 70px;
                color: #2a2a2a;
                font-size: 30px;
                font-weight: lighter;
                padding: 12px 55px;
            }
            &:focus {
                outline: none;
                box-shadow: 0 1px 2px rgba(255, 137, 105, 0.07), 0 2px 4px rgba(255, 137, 105, 0.07),
                    0 4px 8px rgba(255, 137, 105, 0.07), 0 8px 16px rgba(255, 137, 105, 0.07),
                    0 16px 32px rgba(255, 137, 105, 0.07), 0 32px 64px rgba(255, 137, 105, 0.07);
            }
        }
        &-geocoder--icon {
            fill: #2a2a2a;
            top: 16px;
            &-search {
                @media screen and (min-width: 600px) {
                    height: 38px;
                    width: 38px;
                }
            }
        }
    }
`;

export default SearchBar;
