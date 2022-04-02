import React from 'react';

import { createClient } from 'pexels';

const client = createClient(`${process.env.REACT_APP_PEXELS}`);

const useGetPexelsPhotos = (query: string): { photoData: any | undefined; isLoading: boolean } => {
    const [photoData, setPhotoData] = React.useState<any>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                client.photos.search({ query, per_page: 5 }).then((res) => {
                    setPhotoData(res);
                    setIsLoading(false);
                });
            } catch (err) {
                throw err;
            }
        };

        fetchData();
    }, [query]);

    return { photoData, isLoading };
};

export { useGetPexelsPhotos };
