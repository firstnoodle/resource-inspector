import { ApiClient, addResponseTransformer } from './BaseClient.js';
import CompanyTypeResponseTransformer from '../ResponseTransformers/CompanyTypeResponseTransformer.js';

let client = new ApiClient('companies');

export default {
    // only for testing purposes
    all() {
        return client.get();
    },

    filter(params = null) {
        return client.get(null, { params });
    },

    getById(id) {
        return client.get(id);
    },

    getByCode(code) {
        return client.get(code);
    },

    getCompanyTypes() {
        return client.get('types', { ...addResponseTransformer(CompanyTypeResponseTransformer) });
    },
};
