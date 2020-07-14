import * as types from './mutation-types.js';
import { setNestedProp } from '~/utils/props.js';
import { uniqueId } from '~/utils/id.js';
import { sortDirections } from '~/utils/sorting.js';
import { getDefaultState } from './state.js';

export const mutations = {
    [types.RESET_STATE](state) {
        Object.assign(state, getDefaultState());
    },

    [types.APPLY_SETTING](state, { setting, value }) {
        state.settings[setting] = value;
    },

    [types.SET_ROWS](state, rows) {
        state.rows = rows;
    },

    [types.DELETE_ROW](state, id) {
        const index = state.rows.findIndex(row => row.id === id);
        Vue.delete(state.rows, index);
    },

    [types.SET_LIVE_UPDATE](state, value) {
        state.settings.liveUpdate = value;
    },

    [types.SET_LOADING](state, loading) {
        state.loading = loading;
    },

    [types.SET_CURRENT_QUERY](state, query) {
        state.currentQuery = query;
    },

    // Filters //

    [types.ADD_TO_EXISTING_FILTER](state, { column, value }) {
        const targetFilter = state.filters.find(filter => filter.column === column);
        targetFilter.values.push(value);
    },

    [types.DELETE_FILTER](state, id) {
        state.filters = state.filters.filter(filter => filter.id !== id);
    },

    [types.NEW_FILTER](state, filter) {
        console.log('NEW_FILTER', filter, state.filters);

        state.filters.push({
            id: uniqueId(),
            column: filter ? filter.column : null,
            values: filter.values,
        });
        console.log(state);
    },

    [types.SET_FILTER_ATTRIBUTE](state, { id, attribute, value }) {
        let filter = state.filters.find(filter => filter.id === id);
        setNestedProp(filter, [attribute], value);
    },

    // Pagination //

    [types.SET_CURRENT_PAGE](state, page) {
        state.pagination.page = page;
    },

    [types.SET_LAST_PAGE](state, lastPage) {
        state.pagination.last_page = lastPage;
    },

    [types.SET_PAGINATION_PROPS](state, pagination) {
        state.pagination.from = pagination.from;
        state.pagination.last_page = pagination.last_page;
        state.pagination.page = pagination.current_page;
        state.pagination.to = pagination.to;
        state.pagination.total = pagination.total;
    },

    [types.SET_PER_PAGE](state, perPage) {
        state.pagination.per_page = perPage;
    },

    [types.SET_PER_PAGE_OPTIONS](state, perPageOptions) {
        state.pagination.perPageOptions = perPageOptions;
    },

    // Sortings //

    [types.NEW_SORTING](state, sorting = null) {
        state.sortings.push({
            id: uniqueId(),
            column: sorting ? sorting.column : null,
            direction: sorting ? sorting.direction : sortDirections.ASCENDING,
        });
    },

    [types.DELETE_SORTING](state, id) {
        const sorting = state.sortings.findIndex(sorting => sorting.id === id);
        Vue.delete(state.sortings, sorting);
    },

    [types.SET_SORTING_COLUMN](state, { id, column }) {
        let sorting = state.sortings.find(sorting => sorting.id === id);
        Vue.set(sorting, 'column', column);
    },

    [types.SET_SORTING_DIRECTION](state, { id, direction }) {
        let sorting = state.sortings.find(sorting => sorting.id === id);
        Vue.set(sorting, 'direction', direction);
    },
};
