export interface PlacesFields {
    attribution: string;
    features: [
        {
            center: [];
            context: {
                id: string;
                short_code?: string;
                text: 'Ontario';
                wikidata?: string;
            };
            geometry: {
                coordinates: {
                    0: number;
                    1: number;
                };
                type: string;
            };
            id: string;
            place_name: string;
            place_type: [];
            properties: {
                address: string;
                category: string;
                foursquare: string;
                landmark: boolean;
                wikidata?: string;
            };
            relevance: number;
            text: string;
        },
    ];
    query: [];
}
