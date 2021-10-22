import axios from 'axios';

import { PlacesFields } from '../models/placesOfInterest';

const GetPlacesOfInterest = async (
    item: string,
    lat: number | undefined,
    lon: number | undefined,
): Promise<PlacesFields> => {
    try {
        const res = await axios.get<PlacesFields>(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${item}.json?limit=3&types=poi&country=CA&reverseMode=score&proximity=${lon},${lat}&access_token=${process.env.REACT_APP_MAPBOX}
            `,
        );
        return res.data;
    } catch (err) {
        throw err;
    }
};

export { GetPlacesOfInterest };
