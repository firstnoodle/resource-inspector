import AuthClient from '~/Api/Clients/AuthClient.js';
import HttpClient from '~/Api/Clients/BaseClient.js';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app: {
            namespaced: true,
            state: {
                user: null,
            },

            getters: {
                user: state => {
                    return state.user;
                },
            },

            mutations: {
                SET_USER: (state, user) => {
                    state.user = user;
                },
            },

            actions: {
                getCookie: async ({ dispatch }) => {
                    try {
                        await HttpClient.get('/airlock/csrf-cookie');
                        if (window.Laravel.isAuthenticated) {
                            await dispatch('fetchUser');
                        }
                    } catch (error) {
                        console.error('[store/index.js]', error);
                    }
                },

                fetchUser: async ({ commit }) => {
                    try {
                        let { data } = await HttpClient.get('/api/user');
                        commit('SET_USER', data);
                    } catch (error) {
                        console.error(error);
                    }
                },

                login: async ({ dispatch }, credentials) => {
                    try {
                        let response = await AuthClient.login(credentials);
                        window.Laravel.isAuthenticated = true;
                        await dispatch('fetchUser');
                        return await Promise.resolve(response);
                    } catch (error) {
                        return await Promise.reject(error);
                    }
                },

                logout: async ({ commit }) => {
                    try {
                        await AuthClient.logout();
                        window.Laravel.isAuthenticated = false;
                        commit('SET_USER', null);
                    } catch (error) {
                        console.error(error);
                    }
                },

                register: async ({ commit }, credentials) => {
                    try {
                        let response = await AuthClient.register(credentials);
                        window.Laravel.isAuthenticated = true;
                        return await Promise.resolve(response);
                    } catch (error) {
                        return await Promise.reject(error);
                    }
                },

                forgotPassword: async (context, credentials) => {
                    try {
                        let response = await AuthClient.forgotPassword(credentials);
                        return await Promise.resolve(response);
                    } catch (error) {
                        return await Promise.reject(error);
                    }
                },

                resetPassword: async (context, credentials) => {
                    try {
                        let response = await AuthClient.resetPassword(credentials);
                        return await Promise.resolve(response);
                    } catch (error) {
                        return await Promise.reject(error);
                    }
                },
            },
        },
    },
});
