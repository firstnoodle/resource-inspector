import { ApiClient, addResponseTransformer } from './BaseClient.js';
import PortResponseTransformer from '../ResponseTransformers/PortResponseTransformer.js';

let client = new ApiClient('ports');

export default {
    // only for testing purposes
    all() {
        return client.get();
    },

    filter(params = null) {
        return client.get(null, { params });
    },

    getById(id) {
        return client.get(`${id}`, { ...addResponseTransformer(PortResponseTransformer) });
    },

    // Code is route key getRouteKeyName defined in app/Traits/CodeTrait.php
    getByCode(code) {
        return client.get(`${code}`);
    },
};
