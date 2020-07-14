import { getValueFromPath } from '~/utils/object.js';

export const getters = {
    allowedFilterByColumns: state => {
        let columns = [];
        for (const column of state.settings.columns) {
            if (column.allowFiltering) columns.push(column);
        }
        return columns;
    },

    allowedSortingColumns: state => {
        let columns = [];
        for (const column of state.settins.columns) {
            if (column.allowSorting) columns.push(column);
        }
        return columns;
    },

    columns: state => {
        return state.settings.columns;
    },

    columnByLabel: state => label => {
        return state.settings.columns.find(column => column.label === label);
    },

    columnByName: state => columnName => {
        for (const column of state.settings.columns) {
            if (column.name === columnName) return column;
        }
        return null;
    },

    columnNames: state => {
        let names = [];
        for (const column of state.settings.columns) {
            names.push(column.name);
        }
        return names;
    },

    columnValue: () => (row, path) => {
        return getValueFromPath(row, path);
    },

    currentSortingColumns: state => {
        let columns = [];
        for (const sorting of state.sortings) {
            columns.push(sorting.column);
        }
        return columns;
    },

    dirty: (state, getters) => {
        return !(getters.queryString === state.currentQuery);
    },

    filterColumns: state => {
        let columns = [];
        for (const filter of state.filters) {
            columns.push(filter.column);
        }
        return columns;
    },

    filters: state => {
        return state.filters;
    },

    filterByName: state => name => {
        for (const filter of state.filters) {
            if (filter.column === name) return filter;
        }
        return null;
    },

    lastPage: state => {
        return state.pagination.last_page;
    },

    page: state => {
        return state.pagination.page;
    },

    pagination: state => {
        return state.pagination;
    },

    perPageOptions: state => {
        return state.pagination.perPageOptions;
    },

    // collect all queries (pagination,sorting,filters) in one object
    queries: state => {
        let queries = {};

        // pagination
        if (state.settings.paginationEnabled) {
            const page = state.pagination.page;
            const per_page = state.pagination.per_page;

            if (page) queries.page = page.toString();
            if (per_page) queries.per_page = per_page.toString();
        }

        // sorting
        let sortings = [];
        for (const sorting of state.sortings) {
            sortings.push(sorting.direction + sorting.column);
        }
        if (sortings.length) queries.sortings = sortings.join(',');

        // filters
        let filters = [];
        for (const filter of state.filters) {
            filters.push(`[${filter.column}]=${filter.values.join(',')}`);
        }
        if (filters.length) queries.filters = filters.join('&');

        return queries;
    },

    queryString: (state, getters) => {
        let queries = [];
        if (getters.validQueries.sortings) queries.push(`sort=${getters.validQueries.sortings}`);
        if (state.settings.paginationEnabled) queries.push(`page=${getters.validQueries.page}`);
        if (state.settings.paginationEnabled) queries.push(`per_page=${getters.validQueries.per_page}`);
        if (getters.validQueries.filters) queries.push(getters.validQueries.filters);

        return '?' + queries.join('&');
    },

    rows: state => {
        return state.rows;
    },

    settings: state => {
        return state.settings;
    },

    validQueries: state => {
        let queries = {};

        // pagination
        if (state.settings.paginationEnabled) {
            const { page, per_page } = state.pagination;
            if (page && per_page) {
                if (page) queries.page = page.toString();
                if (per_page) queries.per_page = per_page.toString();
            }
        }

        // sorting
        let validSortings = [];
        for (const sorting of state.sortings) {
            if (sorting.column && sorting.direction) {
                validSortings.push(sorting.direction + sorting.column);
            }
        }
        if (validSortings.length) queries.sortings = validSortings.join(',');

        // filters - only complete filters
        let validFilters = [];
        for (const filter of state.filters) {
            if (filter.column && filter.values.length) {
                validFilters.push(`filter[${filter.column}]=${filter.values.join(',')}`);
            }
            // if (filter.column && filter.operator && filter.value) {
            //     validFilters.push(`${filter.column}[${filter.operator}]${filter.value}`);
            // }
        }
        if (validFilters.length) queries.filters = validFilters.join('&');
        return queries;
    },

    settingsValid: state => {
        for (const property in state.settings) {
            if (state.settings[property] === null) return false;
        }
        return true;
    },

    sortings: state => {
        return state.sortings;
    },
};
