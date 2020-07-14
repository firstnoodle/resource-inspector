import { ApiClient, addResponseTransformer } from './BaseClient.js';
import CountryResponseTransformer from '../ResponseTransformers/CountryResponseTransformer.js';

let client = new ApiClient('countries');

export default {
    query(value) {
        return client.get(null, {
            params: {
                q: value,
            },
            ...addResponseTransformer(CountryResponseTransformer),
        });
    },

    getByCode(code) {
        return client.get(code);
    },
};
