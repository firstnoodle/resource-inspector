import { arrayContains, objectIsEmpty } from '~/utils/object.js';
import { parseFilters } from '~/utils/filters.js';
import { parseSortings, getOppositeDirection, sortDirections } from '~/utils/sorting.js';
import { parsePagination } from '~/utils/pagination.js';

export const actions = {
    /**
     * Apply default queries.
     * This will get called from 'mounted' if there are no queries it $route.query
     *
     * @param {context} param0
     */
    applyDefaultQueries({ commit, getters }) {
        if (getters.settings.defaultQuery) {
            // FILTERS
            if (getters.settings.defaultQuery.filters) {
                const currentFilterColumns = getters.filterColumns;
                for (const filter of getters.settings.defaultQuery.filters) {
                    if (!arrayContains(currentFilterColumns, filter.column)) {
                        commit('NEW_FILTER', {
                            column: filter.column,
                            operator: filter.operator.acronym,
                            values: filter.value,
                        });
                    } else {
                        console.error(`[QueryBuilderMixin] default filter [${filter.column}] column does not exist`);
                    }
                }
            }

            // SORTINGS
            if (getters.settings.defaultQuery.sortings) {
                const currentSortingColumns = getters.currentSortingColumns;

                for (const sorting of getters.settings.defaultQuery.sortings) {
                    if (!arrayContains(currentSortingColumns, sorting.column)) {
                        commit('NEW_SORTING', {
                            column: sorting.column,
                            direction: sorting.operator,
                        });
                    } else {
                        console.error(`[QueryBuilderMixin] default sorting [${sorting.column}] column already exists`);
                    }
                }
            }

            // PAGINATION
            if (getters.settings.defaultQuery.page) {
                commit('SET_CURRENT_PAGE', getters.settings.defaultQuery.page);
            }
            if (getters.settings.defaultQuery.per_page) {
                commit('SET_PER_PAGE', getters.settings.defaultQuery.per_page);
            }
        }
    },

    /**
     * Apply settings defined im component implementing this
     *
     * @param {context} param0
     * @param {Object} settings
     */
    applySettings({ commit, state }, settings) {
        for (const setting in state.settings) {
            if (!(setting in settings)) {
                console.error(
                    `[DataInspector @ actions @ applySettings] required prop [settings.${setting}] not present`
                );
                continue;
            }
            if (settings[setting] === null) {
                console.error(
                    `[DataInspector @ actions @ applySettings] required prop [settings.${setting}] has null-value`
                );
                continue;
            }
            commit('APPLY_SETTING', { setting, value: settings[setting] });
        }
    },

    /**
     * Calculate per page options for pagination ui
     *
     * @param {context} param0
     */
    calculatePerPageOptions({ commit, state }) {
        let allowedOptions = [];

        // handle if state.pagination.last_page is 1 - set per_page to 10
        // otherwise make a list of allowed options
        if (state.pagination.total < state.pagination.perPageDefaults[0]) {
            allowedOptions.push(state.pagination.perPageDefaults[0]);
            commit('SET_PER_PAGE', state.pagination.perPageDefaults[0]);
        } else {
            allowedOptions = state.pagination.perPageDefaults
                .filter(option => option <= state.pagination.total)
                .sort((a, b) => a - b);

            // check if we need to lower per_page
            const highestOption = allowedOptions[allowedOptions.length - 1];
            if (highestOption > state.pagination.perPageOptions[state.pagination.perPageOptions.length - 1])
                commit('SET_PER_PAGE', highestOption);
        }

        let newPerPageOptions = [];
        for (const i in allowedOptions) {
            const option = allowedOptions[i];
            const pages = Math.ceil(state.pagination.total / option);
            newPerPageOptions.push({
                label: pages,
                value: option,
            });
        }
        commit('SET_PER_PAGE_OPTIONS', newPerPageOptions);
    },

    /**
     * Change page based on a direction input
     *
     * @param {context} param0
     * @param {Integer} direction
     */
    changePage({ commit, state }, direction) {
        const requestedPage = state.pagination.page + direction;
        if (requestedPage < 1) {
            commit('SET_CURRENT_PAGE', state.pagination.last_page);
            return;
        }
        if (requestedPage > state.pagination.last_page) {
            commit('SET_CURRENT_PAGE', 1);
            return;
        }
        commit('SET_CURRENT_PAGE', requestedPage);
    },

    changePerPage({ commit }, { label: totalPages, value: perPage }) {
        commit('SET_PER_PAGE', parseInt(perPage));
        commit('SET_CURRENT_PAGE', parseInt(1));
        commit('SET_LAST_PAGE', parseInt(totalPages));
    },

    /**
     * Receives filters from processRouteQuery ($route.query),
     * parses and validates them and performs UPDATE, CREATE or DELETE
     *
     * @param {context} param0
     * @param {Array} newFilters
     */
    processFilters({ commit, dispatch, getters }, filters) {
        const newFilters = parseFilters(filters, getters.columns);
        const currentFilterColumns = getters.filterColumns;

        let newFilterColumns = [];
        for (const newFilter of newFilters) {
            // UPDATE
            for (const currentFilter of getters.filters) {
                if (currentFilter.column === newFilter.column) {
                    dispatch('setFilterAttribute', {
                        id: currentFilter.id,
                        attribute: 'values',
                        value: newFilter.values,
                    });
                }
            }
            // CREATE
            if (!arrayContains(currentFilterColumns, newFilter.column)) {
                commit('NEW_FILTER', {
                    column: newFilter.column,
                    operator: newFilter.operator,
                    values: newFilter.values,
                });
            }
            newFilterColumns.push(newFilter.column);
        }
        // DELETE
        for (const currentFilterColumn of currentFilterColumns) {
            if (!arrayContains(newFilterColumns, currentFilterColumn)) {
                const { id } = getters.filterByName(currentFilterColumn);
                commit('DELETE_FILTER', id);
            }
        }
    },

    /**
     * Receives pagination from processRouteQuery ($route.query),
     * parses and validates them and performs UPDATE, CREATE or DELETE
     *
     * @param {context} param0
     * @param {Array} newPagination
     */
    processPagination({ commit, getters }, pagination) {
        console.log('processPagination', pagination);
        if (getters.settings.paginationEnabled) {
            const newPagination = parsePagination(pagination);
            if (!objectIsEmpty(pagination)) {
                commit('SET_CURRENT_PAGE', newPagination.page);
                commit('SET_PER_PAGE', newPagination.per_page);
            }
        }
    },

    /**
     * Receives sortings from processRouteQuery ($route.query),
     * parses and validates them and performs UPDATE, CREATE or DELETE
     *
     * @param {context} param0
     * @param {Array} newSortings
     */
    processSortings({ commit, dispatch, getters }, sortings) {
        const newSortings = parseSortings(sortings, getters.columns);
        const currentSortingColumns = getters.currentSortingColumns;

        let newSortingColumns = [];
        for (const newSorting of newSortings) {
            // UPDATE //
            for (const currentSorting of getters.sortings) {
                if (currentSorting.column === newSorting.column) {
                    dispatch('setSortingDirection', {
                        id: currentSorting.id,
                        direction: newSorting.operator,
                    });
                }
            }
            // CREATE //
            if (!arrayContains(currentSortingColumns, newSorting.column)) {
                commit('NEW_SORTING', {
                    column: newSorting.column,
                    direction: newSorting.operator,
                });
            }
            newSortingColumns.push(newSorting.column);
        }
        // DELETE //
        for (const currentSortingColumn of currentSortingColumns) {
            if (!arrayContains(newSortingColumns, currentSortingColumn)) commit('DELETE_SORTING', currentSortingColumn);
        }
    },

    /**
     * Receives the $route.query object
     * and splits it into pagination, sortings, and filters
     * and sends them onwards for further processing
     *
     * @param {context} param0
     * @param {Object} queries
     */
    processRouteQueries({ dispatch }, queries) {
        let pagination = {},
            sortings = {},
            filters = {};

        console.log(queries);
        for (const query in queries) {
            if (query === 'page' || query === 'per_page') {
                pagination[query] = queries[query];
                continue;
            }
            if (query === 'sortings') {
                sortings[query] = queries[query];
                continue;
            }
            if (query === 'filters') {
                filters[query] = queries[query];
                continue;
            }
        }

        dispatch('processPagination', pagination);
        dispatch('processSortings', sortings);
        dispatch('processFilters', filters);
    },

    /**
     * Set sorting column
     *
     * @param {context} param0
     * @param {String} column
     */
    setSortingColumn({ commit, getters, dispatch, state }, column) {
        if (getters.sortBy === column) {
            dispatch('setSortingDirection');
        } else {
            commit('SET_SORTING_DIRECTION', sortDirections.DESCENDING);
            commit('SET_SORTING_COLUMN', column);
        }
    },

    /**
     * Set pagination page
     *
     * @param {context} param0
     * @param {Integer} pageNumber
     */
    setPage({ commit, state }, pageNumber) {
        if (pageNumber < 1) {
            commit('SET_CURRENT_PAGE', 1);
            return;
        }
        if (pageNumber > state.pagination.last_page) {
            commit('SET_CURRENT_PAGE', state.pagination.last_page);
            return;
        }
        commit('SET_CURRENT_PAGE', pageNumber);
    },

    /**
     * Toggle sorting direction
     *
     * @param {context} param0
     * @param {Integer} id
     */
    toggleSortByDirection({ commit, state }, id) {
        // TODO: change payload to be {id, direction}
        // then there is no need for 'find'
        const sorting = state.sortings.find(sorting => sorting.id === id);
        const direction = getOppositeDirection(sorting.direction);
        commit('SET_SORTING_DIRECTION', { id, direction });
    },

    /**
     * Update pagination
     *
     * @param {context} param0
     * @param {Object} pagination
     */
    syncPagination({ commit, dispatch }, pagination) {
        commit('SET_PAGINATION_PROPS', pagination);
        dispatch('calculatePerPageOptions');
    },

    /****************************************************
       Single actions - might as well be direct commits 
     ****************************************************/
    deleteFilter({ commit }, id) {
        commit('DELETE_FILTER', id);
    },
    deleteRow({ commit }, id) {
        commit('DELETE_ROW', id);
    },
    // newFilter({ commit, state }, { column, value }) {
    //     // if column exists - add to values array
    //     if (state.filters.find(filter => filter.column === column)) {
    //         commit('ADD_TO_EXISTING_FILTER', { column, value });
    //     } else {
    //         commit('NEW_FILTER', { column, value });
    //     }
    // },
    removeFilter({ commit, state }, { column, value }) {
        // remove value from values
        // if values empty -> delete filter entirely
    },
    newSorting({ commit }) {
        commit('NEW_SORTING');
    },
    setFilterAttribute({ commit }, payload) {
        commit('SET_FILTER_ATTRIBUTE', payload);
    },
    setLiveUpdate({ commit }, value) {
        commit('SET_LIVE_UPDATE', value);
    },
    setSortingDirection({ commit, getters, state }, payload) {
        // let direction = getters.sortDirection === sortDirections.DESCENDING ? sortDirections.ASCENDING : sortDirections.DESCENDING
        commit('SET_SORTING_DIRECTION', payload);
    },
    updateSortingColumn({ commit }, newValue) {
        commit('SET_SORTING_COLUMN', newValue);
    },
};
