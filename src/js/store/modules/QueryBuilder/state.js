export const getDefaultState = () => {
    return {
        currentQuery: null,
        filters: [],
        loading: false,
        pagination: {
            from: null,
            last_page: null,
            page: null,
            per_page: null,
            perPageDefaults: [10, 25, 50, 100, 200, 500],
            perPageOptions: [],
            to: null,
            total: null,
        },
        rows: [],
        settings: {
            apiEndPoint: null,
            columns: null,
            defaultQuery: null,
            filtersEnabled: null,
            liveUpdate: null,
            paginationEnabled: null,
            routerSync: null,
            storePath: null,
        },
        sortings: [],
    };
};
