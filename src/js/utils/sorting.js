import { arrayContains } from '~/utils/object.js';

export const sortDirections = {
    ASCENDING: 'asc',
    DESCENDING: 'desc',
};

export const sortDirectionSymbols = {
    [sortDirections.ASCENDING]: '',
    [sortDirections.DESCENDING]: '-',
};

/**
 * Get opposite direction string value
 *
 * @param {String} direction
 */
export const getOppositeDirection = direction => {
    const directions = Object.values(sortDirections);
    const oppositeIndex = directions.indexOf(direction);
    return directions[1 - oppositeIndex];
};

/**
 *
 * @param {Object} queries
 * @param {Array} columns
 */
export const parseSortings = (queries, columns) => {
    let parsedSortings = [];
    for (const query in queries) {
        if (query === 'sortings') {
            // CHECK FOR MULTIPLE VALUES
            const sortings = queries[query].split(',');
            for (const sorting of sortings) {
                // get direction
                let result = {};
                result.operator = sorting[0] === '-' ? '-' : '';
                result.column = sorting[0] === '-' ? sorting.slice(1, sorting.length) : sorting;

                // check if sorting column exists
                if (
                    arrayContains(
                        columns.map(column => column.name),
                        result.column
                    )
                ) {
                    for (const column of columns) {
                        if (column.name === result.column) {
                            // ALLOWED FOR SORTING
                            if (column.allowSorting) parsedSortings.push(result);
                            else
                                console.error(
                                    `[sorting] not allowed for column [${result.column}], so it has been removed`
                                );
                        }
                    }
                } else {
                    console.error(`[sorting] column [${result.column}] doesn't exist, so it has been removed`);
                }
            }
        }
    }
    return parsedSortings;
};
