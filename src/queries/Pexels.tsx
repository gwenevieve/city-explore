import { createClient } from 'pexels';

const client = createClient(`${process.env.REACT_APP_PEXELS}`);

const GetBannerPhotos = (query: string): Promise<any> => {
    try {
        return client.photos.search({ query, per_page: 5 });
    } catch (err) {
        throw err;
    }
};

export { GetBannerPhotos };
