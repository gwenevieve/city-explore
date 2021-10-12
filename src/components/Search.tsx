import React from 'react';
import styled from 'styled-components';

import { Container } from '@mui/material';

import { Coordinates } from '../models/coordinates';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const SearchBar = ({
    setLocation,
    setLocationName,
}: {
    setLocation: React.Dispatch<React.SetStateAction<Coordinates | undefined>>;
    setLocationName: React.Dispatch<React.SetStateAction<string | undefined>>;
}): JSX.Element => {
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
        if (e && e.result) {
            setLocation({
                latitude: e.result.geometry.coordinates[1],
                longitude: e.result.geometry.coordinates[0],
            });
            setLocationName(`${e.result.place_name}`);
        }
    });

    return (
        <SearchContainer>
            <GeocodeSearch
                onKeyDown={(event: any) => {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                }}
                id="geocoder-container"
            />
        </SearchContainer>
    );
};

const SearchContainer = styled(Container)``;

const GeocodeSearch = styled.div``;

export default SearchBar;
