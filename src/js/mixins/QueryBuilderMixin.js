import { isEqual, objectIsEmpty } from '~/utils/object.js';
import { ApiClient } from '~/Api/Clients/BaseClient.js';

const DEBUG = false;

export default {
    data() {
        return {
            removeRouteWatcher: null, // fn returned from vuex's $store.watch
            removeStoreWatcher: null, // fn returned from vuex's $store.watch
            routePushed: false, // Flag to handle flow
            storePath: null,
        };
    },

    computed: {
        settings() {
            return this.$store.getters[`${this.storePath}/settings`];
        },
    },

    created() {
        if (!this.storePath) {
            console.error('[QueryBuilderMixin] missing required storePath definition');
        }
    },

    mounted() {
        console.log(this.$store.state.Companies);
        if (DEBUG) console.log('mounted');
        if (DEBUG) console.log(this.$store.state.Companies);

        if (this.$store.getters[`${this.storePath}/settingsValid`]) {
            // applyDefaultQueries ?
            if (this.settings.routerSync ? objectIsEmpty(this.$route.query) : true) {
                this.$store.dispatch(`${this.storePath}/applyDefaultQueries`);
            } else if (this.settings.routerSync) {
                this.$store.dispatch(`${this.storePath}/processRouteQueries`, this.$route.query);
            }

            this.addStoreWatcher();

            if (this.settings.routerSync) {
                this.addRouteWatcher();

                if (this.queriesChanged()) {
                    this.replaceQueries();
                } else {
                    this.fetchData();
                }
            }

            if (this.settings.liveUpdate && !this.settings.routerSync) {
                this.fetchData();
            }
        }
    },

    beforeDestroy() {
        this.removeRouteWatcher();
        this.removeStoreWatcher();
    },

    methods: {
        addRouteWatcher() {
            if (DEBUG) console.log('addRouteWatch');
            this.removeRouteWatcher = this.$watch('$route', (to, from) => {
                if (DEBUG) console.log('routeWatcher');
                if (!this.routePushed) {
                    this.$store.dispatch(`${this.storePath}/processRouteQueries`, this.$route.query);
                }
                this.fetchData();
                this.routePushed = false;
            });
        },

        addStoreWatcher() {
            if (DEBUG) console.log('addStoreWatch');
            this.removeStoreWatcher = this.$store.watch(
                (state, getters) => getters[`${this.storePath}/validQueries`],
                (newValue, oldValue) => {
                    if (DEBUG) console.log('storeWatch');
                    if (this.settings.liveUpdate) {
                        // ANY CHANGE ?
                        if (!isEqual(newValue, oldValue)) {
                            let queries = this.$store.getters[`${this.storePath}/queries`];

                            // set page=1 -> if filters changed and paginationEnabled
                            if (oldValue.filters || newValue.filters) {
                                if (!isEqual(oldValue.filters, newValue.filters) && this.settings.paginationEnabled) {
                                    queries.page = 1;
                                }
                            }

                            if (this.settings.routerSync) this.pushQueries({ query: queries });
                            else this.fetchData();
                        }
                    } else {
                        if (this.settings.paginationEnabled) {
                            if (
                                newValue.pagination.page !== oldValue.pagination.page ||
                                newValue.pagination.per_page !== oldValue.pagination.per_page
                            ) {
                                this.pushQueries();
                            }
                        }
                        if (newValue.sortings.length !== oldValue.sortings.length) {
                            if (this.settings.routerSync) {
                                this.pushQueries();
                            } else {
                                this.fetchData();
                            }
                        }
                    }
                }
            );
        },

        async fetchData() {
            if (DEBUG) console.log('fetchData');
            if (DEBUG) console.log('removeStoreWatch');

            this.removeStoreWatcher();
            this.$store.commit(`${this.storePath}/SET_LOADING`, true);
            this.$store.commit(`${this.storePath}/SET_ROWS`, []);

            try {
                const client = new ApiClient(this.settings.apiEndPoint);
                const response = await client.get(null, {
                    params: this.$store.getters[`${this.storePath}/validQueries`],
                });
                this.$store.commit(
                    `${this.storePath}/SET_CURRENT_QUERY`,
                    this.$store.getters[`${this.storePath}/queryString`]
                );
                this.$store.commit(`${this.storePath}/SET_ROWS`, response.data.data);
                if (this.settings.paginationEnabled) {
                    this.$store.dispatch(`${this.storePath}/syncPagination`, response.data.meta);
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.$store.commit(`${this.storePath}/SET_LOADING`, false);
                this.addStoreWatcher();
            }
        },

        pushQueries() {
            if (DEBUG) console.log('pushQueries');
            this.routePushed = true;
            this.$router.push({ name: this.$route.name, query: this.$store.getters[`${this.storePath}/queries`] });
        },

        // action or getter ?
        queriesChanged() {
            return !isEqual(this.$store.getters[`${this.storePath}/queries`], this.$route.query);
        },

        replaceQueries() {
            if (DEBUG) console.log('replaceQueries');
            this.routePushed = true;
            this.$router.replace({ query: this.$store.getters[`${this.storePath}/queries`] });
        },

        update() {
            if (this.settings.routerSync) {
                this.pushQueries();
            } else {
                this.fetchData();
            }
        },
    },
};
