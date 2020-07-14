import { ApiClient } from './BaseClient.js';

let client = new ApiClient();

export default {
    login(credentials) {
        return client.post('login', credentials);
    },

    logout() {
        return client.post('logout');
    },

    register(credentials) {
        return client.post('register', credentials);
    },

    forgotPassword(credentials) {
        return client.post('forgot-password', credentials);
    },

    resetPassword(credentials) {
        return client.post('reset-password', credentials);
    },
};
