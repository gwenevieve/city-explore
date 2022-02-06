import React from 'react';
import styled from 'styled-components';

import { Container } from '@mui/material';

import { Haversine } from '../utilities/Haversine';

import { Coordinates } from '../models/coordinates';
import { Features } from '../models/placesOfInterest';

import { GetPlacesOfInterest } from '../queries/Mapbox';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LocationMap = ({ location }: { location: Coordinates | undefined }): JSX.Element => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX}`;
    const [placeData, setPlaceData] = React.useState<Features[]>();
    const mapDiv = React.useRef<HTMLDivElement>(null);
    const itemsOfInterest = ['park', 'beach', 'gift', 'casino', 'museum'];

    const collectPlacesOfInterest = async () => {
        const collectedPlacesOfInterest: Features[] = [];
        try {
            await Promise.all(
                itemsOfInterest.map(async (item) => {
                    await GetPlacesOfInterest(item, location?.latitude, location?.longitude).then((result) => {
                        result.features.forEach((interest: Features) => {
                            if (location?.latitude && location?.longitude) {
                                if (
                                    Math.floor(
                                        Haversine(
                                            location?.latitude,
                                            location?.longitude,
                                            interest.geometry.coordinates[1],
                                            interest.geometry.coordinates[0],
                                        ),
                                    ) < 25
                                ) {
                                    collectedPlacesOfInterest.push(interest);
                                }
                            }
                        });
                    });
                }),
            ).then(() => {
                setPlaceData(collectedPlacesOfInterest);
            });
        } catch {
            console.error(`Couldn't load data to populate map.`);
        }
    };

    React.useEffect(() => {
        if (location?.latitude && location?.longitude) {
            collectPlacesOfInterest();
        }
    }, [location]);

    React.useEffect(() => {
        let map: mapboxgl.Map;
        if (location?.longitude && location?.latitude) {
            map = new mapboxgl.Map({
                container: mapDiv.current || '',
                style: 'mapbox://styles/gwenevieve/ckx3wofeu0i0v14mzhe8pjyr3',
                center: [location.longitude, location.latitude],
                zoom: 12,
            });
            const bounds = new mapboxgl.LngLatBounds();
            if (placeData && placeData.length >= 1) {
                placeData.map((element) => {
                    const popup = new mapboxgl.Popup({ offset: 25 }).setText(`${element.text}`);
                    bounds.extend([element.geometry.coordinates[0], element.geometry.coordinates[1]]);
                    new mapboxgl.Marker({
                        color: '#FF8969',
                    })
                        .setLngLat([element.geometry.coordinates[0], element.geometry.coordinates[1]])
                        .setPopup(popup)
                        .addTo(map);
                });
                map.fitBounds(bounds, { padding: 50 });
            }
        }
    }, [location, placeData]);

    return (
        <MapContainer disableGutters maxWidth="md">
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
