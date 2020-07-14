import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

//import Raven from 'raven-js';
//import store from '../store/index';

const API_PREFIX = '/api/';

/**
 * Utility functions
 * we need to add axios' default tranformer.
 * https://github.com/axios/axios/issues/430
 *
 * @param {string} type
 * @param {fn} transformer
 * returns config object with tranform[type]
 */
const addTransformer = (type, transformer) => {
    return {
        [type]: [...axios.defaults[type], transformer],
    };
};

export const addResponseTransformer = transformer => {
    return addTransformer('transformResponse', transformer);
};

export const addRequestTransformer = transformer => {
    return addTransformer('transformRequest', transformer);
};

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseURL = null) => {
    const client = axios.create({ baseURL });

    // Add a request interceptor
    client.interceptors.request.use(
        requestConfig => requestConfig,
        requestError => {
            // Raven.captureException(requestError);
            return Promise.reject(requestError);
        }
    );

    // Add a response interceptor
    client.interceptors.response.use(
        response => response,
        error => {
            console.error('[ApiClient response interceptor] error: ' + error.response.status);

            if (error.response.status >= 500) {
                // Raven.captureException(error);
            }
            if (error.response.status === 401) {
                // console.log('ApiClient redirect');
            }

            return Promise.reject(error);
        }
    );

    return client;
};

class ApiClient {
    constructor(baseUrl = null) {
        this.client = getClient(API_PREFIX + (baseUrl || ''));
    }

    async get(url = null, conf = {}) {
        try {
            const response = await this.client.get(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async query(query, conf = {}) {
        try {
            const response = await this.client.get('?q=' + query, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async delete(url = null, conf = {}) {
        try {
            const response = await this.client.delete(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async head(url = null, conf = {}) {
        try {
            const response = await this.client.head(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async options(url = null, conf = {}) {
        try {
            const response = await this.client.options(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async post(url = null, data = {}, conf = {}) {
        try {
            const response = await this.client.post(url, data, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async put(url = null, data = {}, conf = {}) {
        try {
            const response = await this.client.put(url, data, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    async patch(url = null, data = {}, conf = {}) {
        try {
            const response = await this.client.patch(url, data, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
    // Provide request methods with the default base_url
    async get(url, conf = {}) {
        try {
            const response = await getClient().get(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    async delete(url, conf = {}) {
        try {
            const response = await getClient().delete(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    async head(url, conf = {}) {
        try {
            const response = await getClient().head(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    async options(url, conf = {}) {
        try {
            const response = await getClient().options(url, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    async post(url, data = {}, conf = {}) {
        try {
            const response = await getClient().post(url, data, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    async put(url, data = {}, conf = {}) {
        try {
            const response = await getClient().put(url, data, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },

    async patch(url, data = {}, conf = {}) {
        try {
            const response = await getClient().patch(url, data, conf);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    },
};
