import React from 'react';
import styled from 'styled-components';

import { Container } from '@mui/material';

import { Coordinates } from '../models/coordinates';

import mapboxgl from 'mapbox-gl';

const LocationMap = ({ location }: { location: Coordinates | undefined }): JSX.Element => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX}`;
    const mapDiv = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
        const attachMap = (
            setMap: React.Dispatch<React.SetStateAction<any>>,
            mapDiv: React.RefObject<HTMLDivElement>,
        ) => {
            if (!mapDiv.current) {
                return;
            }
            if (location) {
                const map = new mapboxgl.Map({
                    container: mapDiv.current || '',
                    style: 'mapbox://styles/mapbox/outdoors-v11',
                    center: [location?.longitude, location?.latitude],
                    zoom: 10,
                });
                setMap(map);
            }
        };

        !map && attachMap(setMap, mapDiv);
    }, [map, location]);

    return <MapContainer ref={mapDiv}></MapContainer>;
};

const MapContainer = styled(Container)``;

export default LocationMap;
