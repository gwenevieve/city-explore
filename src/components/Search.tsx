import React from 'react';
import styled from 'styled-components';

import { Box } from '@mui/material';

import { Coordinates } from '../models/coordinates';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const SearchBar = ({
    setLocation,
    setLocationName,
    setIsResultLoaded,
    isResultLoaded,
}: {
    setLocation: React.Dispatch<React.SetStateAction<Coordinates | undefined>>;
    setLocationName: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsResultLoaded: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    isResultLoaded?: boolean | undefined;
}): JSX.Element => {
    const inputValue = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0] as HTMLInputElement;

    console.log(inputValue);

    const Geocoder = new MapboxGeocoder({
        accessToken: `${process.env.REACT_APP_MAPBOX}`,
        types: 'place, district, neighborhood',
        placeholder: 'Search for a city...',
        minLength: 3,
        countries: 'ca',
    });

    React.useEffect(() => {
        Geocoder.addTo('#geocoder-container');
    }, []);

    Geocoder.on('result', function (e) {
        if (e && e.result) {
            setLocation({
                latitude: e.result.geometry.coordinates[1],
                longitude: e.result.geometry.coordinates[0],
            });
            let cleanedRegionName;
            e.result.context.forEach((element: any) => {
                if (element.id.substr(0, element.id.lastIndexOf('.')) === 'region') {
                    cleanedRegionName = element.short_code.replace('CA-', '');
                }
            });

            setLocationName(`${e.result.text}, ${cleanedRegionName}`);
            setIsResultLoaded(true);
        }
    });

    return (
        <SearchContainer maxWidth="sm">
            <GeocodeSearch
                isResultLoaded={isResultLoaded}
                p={2}
                onKeyDown={(event: React.KeyboardEvent) => {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                }}
                id="geocoder-container"
            />
        </SearchContainer>
    );
};

const SearchContainer = styled(Box)``;

const GeocodeSearch = styled(Box)<{ isResultLoaded: boolean | undefined }>`
    position: ${(props) => (props.isResultLoaded ? 'initial' : 'absolute')};
    top: 25%;
    left: 0;
    right: 0;
    .mapboxgl-ctrl {
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
        &-geocoder {
            box-shadow: none;
            &--icon {
                fill: #2a2a2a;
                top: 16px;
                &-search {
                    left: 10px;
                    height: 30px;
                    width: 30px;
                    @media screen and (min-width: 600px) {
                        height: 38px;
                        width: 38px;
                    }
                }
            }
            &--input {
                height: 60px;
                font-size: 1em;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                @media screen and (min-width: 600px) {
                    height: 70px;
                    color: #2a2a2a;
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
        }
    }
`;

export default SearchBar;
