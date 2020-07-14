import { dataTypes } from '~/utils/filters.js';

export default {
    apiEndPoint: 'companies',
    defaultQuery: {
        page: 1,
        per_page: 10,
    },
    filtersEnabled: true,
    liveUpdate: true,
    paginationEnabled: true,
    routerSync: true,
    storePath: 'Companies',
    columns: [
        {
            label: 'Country',
            name: 'country',
            dataType: dataTypes.MULTI_SELECT,
            allowSorting: true,
            allowFiltering: true,
        },
        {
            label: 'Type',
            name: 'type',
            dataType: dataTypes.MULTI_SELECT,
            allowSorting: true,
            allowFiltering: true,
        },
    ],
};
