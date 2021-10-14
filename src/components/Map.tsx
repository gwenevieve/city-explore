import React from 'react';
import styled from 'styled-components';

import { Container } from '@mui/material';

import { Coordinates } from '../models/coordinates';
import { PlacesFields } from '../models/placesOfInterest';

import { GetPlacesOfInterest } from '../queries/Mapbox';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LocationMap = ({ location }: { location: Coordinates | undefined }): JSX.Element => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX}`;
    const [placeData, setPlaceData] = React.useState<PlacesFields>();
    const mapDiv = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState(null);

    const collectPlacesOfInterest = () => {
        GetPlacesOfInterest(location?.latitude, location?.longitude).then((res) => {
            setPlaceData(res);
        });
    };

    React.useEffect(() => {
        if (location?.latitude) {
            collectPlacesOfInterest();
        }
    }, [location]);

    React.useEffect(() => {
        const attachMap = (
            setMap: React.Dispatch<React.SetStateAction<any>>,
            mapDiv: React.RefObject<HTMLDivElement>,
        ) => {
            if (!mapDiv.current) {
                return;
            }
            if (location && placeData) {
                const map = new mapboxgl.Map({
                    container: mapDiv.current || '',
                    style: 'mapbox://styles/mapbox/outdoors-v11',
                    center: [location?.longitude, location?.latitude],
                    zoom: 10,
                });

                placeData?.features.map((element) => {
                    new mapboxgl.Marker({
                        color: '#FFFFFF',
                    })
                        .setLngLat([element.geometry.coordinates[0], element.geometry.coordinates[1]])
                        .addTo(map);
                });

                setMap(map);
            }
        };

        !map && attachMap(setMap, mapDiv);
    }, [map, location, placeData]);

    return (
        <MapContainer maxWidth="md">
            <MapRender ref={mapDiv} />
        </MapContainer>
    );
};

const MapContainer = styled(Container)`
    position: relative;
    min-height: 45rem;
`;

const MapRender = styled(Container)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
`;

export default LocationMap;
