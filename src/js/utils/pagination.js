import { parseTypeAndValue } from '~/utils/dataTypes.js';

export const FIELDS = {
    PAGE: 'page',
    PER_PAGE: 'per_page',
};

/**
 *
 * @param {Object} queries
 */
export const parsePagination = queries => {
    let pagination = {};

    for (const query in queries) {
        if (query === FIELDS.PAGE || query === FIELDS.PER_PAGE) {
            // VALUE VALID?
            if (parseTypeAndValue(queries[query]).pseudoType === 'int') {
                pagination[query] = queries[query];
            } else {
                console.error(
                    `Wrong data type passed for ${query}=${queries[query]}, so it has been set to a default value of ${pagination[query]}`
                );
            }
        }
    }
    return pagination;
};
