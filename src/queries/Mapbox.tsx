import axios from 'axios';

import { PlacesFields } from '../models/placesOfInterest';

const GetPlacesOfInterest = async (lat?: number, lon?: number): Promise<PlacesFields> => {
    try {
        const res = await axios.get<PlacesFields>(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?limit=5&types=poi&access_token=${process.env.REACT_APP_MAPBOX}
            `,
        );
        return res.data;
    } catch (err) {
        throw err;
    }
};

export { GetPlacesOfInterest };
