import { parseTypeAndValue } from '~/utils/dataTypes.js';
import { arrayContains } from '~/utils/object.js';

export const dataTypes = {
    BOOLEAN: 'boolean',
    DATE: 'date',
    DATETIME: 'datetime',
    NUMBER: 'number',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    STRING: 'string',
};

export const logicOperators = {
    EQUAL: {
        symbol: '=',
        acronym: 'eq',
    },
    GREATER_THAN_OR_EQUAL: {
        symbol: '>=',
        acronym: 'ge',
    },
    GREATER_THAN: {
        symbol: '>',
        acronym: 'gt',
    },
    LESS_THAN_OR_EQUAL: {
        symbol: '<=',
        acronym: 'le',
    },
    LESS_THAN: {
        symbol: '<',
        acronym: 'lt',
    },
    LIKE: {
        symbol: '~',
        acronym: 'like',
    },
    NOT_EQUAL: {
        symbol: '!=',
        acronym: 'ne',
    },
};

export const dataTypeOperators = {
    [dataTypes.BOOLEAN]: [logicOperators.EQUAL, logicOperators.NOT_EQUAL],
    [dataTypes.DATE]: [
        logicOperators.EQUAL,
        logicOperators.GREATER_THAN_OR_EQUAL,
        logicOperators.GREATER_THAN,
        logicOperators.LESS_THAN_OR_EQUAL,
        logicOperators.LESS_THAN,
        logicOperators.NOT_EQUAL,
    ],
    [dataTypes.DATE_TIME]: [logicOperators.GREATER_THAN, logicOperators.LESS_THAN],
    [dataTypes.NUMBER]: [
        logicOperators.EQUAL,
        logicOperators.GREATER_THAN_OR_EQUAL,
        logicOperators.GREATER_THAN,
        logicOperators.LESS_THAN_OR_EQUAL,
        logicOperators.LESS_THAN,
        logicOperators.NOT_EQUAL,
    ],
    [dataTypes.SELECT]: [logicOperators.EQUAL, logicOperators.NOT_EQUAL],
    [dataTypes.MULTI_SELECT]: [logicOperators.EQUAL, logicOperators.NOT_EQUAL],
    [dataTypes.STRING]: [logicOperators.EQUAL, logicOperators.NOT_EQUAL, logicOperators.LIKE],
};

export const logicOperatorLabels = {
    [logicOperators.EQUAL]: '=',
    [logicOperators.GREATER_THAN_OR_EQUAL]: '>=',
    [logicOperators.GREATER_THAN]: '>',
    [logicOperators.LESS_THAN_OR_EQUAL]: '<=',
    [logicOperators.LESS_THAN]: '<',
    [logicOperators.NOT_EQUAL]: '!=',
};

const SEPARATOR_COLUMN = '_';
const SEPARATOR_START_VALUES = '(';
const SEPARATOR_END_VALUES = ')';
const SEPARATOR_VALUES = "'";

/**
 * Syntax: column_op(value'value'value),column_op(value)
 *
 * @param {Object} queries
 * @param {Array} columns
 */
export const parseFilters = ({ filters }, columns) => {
    let parsedFilters = [];
    if (filters) {
        const newFilters = filters.split(',');

        for (const filter of newFilters) {
            const column = getColumn(filter);
            const operator = getOperator(filter);
            const values = getValues(filter);

            if (column && operator && values.length > 0) {
                // column exists
                const targetColumn = columns.find(col => col.name === column);
                if (targetColumn) {
                    if (targetColumn.allowFiltering) {
                        if (!operatorValid(operator)) continue;
                        if (!operatorValidForDataType(operator, targetColumn)) continue;
                        if (!valueCountAllowedForDataType(values, targetColumn)) continue;
                        if (!valuesValid(values, targetColumn)) continue;

                        parsedFilters.push({ column, operator, values });
                    }
                } else {
                    console.error(`filter column ${column} does not exist`);
                }
            } else {
                console.error(`Parsing filter [${filter}] not possible.`);
            }
        }
    }
    // for (const query in queries) {
    // if (query.slice(0, 'filter'.length) === 'filter') {
    //     if (query.includes('[') && query.includes(']') && query.includes('=')) {
    //         const column = query.split('[')[1].split(']')[0];
    //         const values = query.split('=')[1].split(',');
    //         if (columns.find(column => column.name === parsedFilter.column)) {
    //             // for (const value of values) {
    //             // TODO: validate value ?
    //             // }
    //             parseFilters.push({ column, values });
    //         } else {
    //             console.error(`filter column ${column} does not exist`);
    //         }
    //     }
    // } else {
    //     console.error(`filter [${query}] of unknown type`);
    // }
    // }

    return parsedFilters;
};

/**
 *
 * @param {String} filter
 */
const getColumn = filter => {
    const column = filter.split(SEPARATOR_COLUMN)[0];
    return stringOnlyContainsLetters(column) ? column : null;
};

/**
 *
 * @param {String} filter
 */
const getOperator = filter => {
    const separateColumn = filter.split(SEPARATOR_COLUMN);
    if (separateColumn.length === 2) {
        const operator = separateColumn[1].split(SEPARATOR_START_VALUES)[0];
        return stringOnlyContainsLetters(operator) ? operator : null;
    }
    return null;
};

/**
 *
 * @param {String} filter
 */
const getValues = filter => {
    const separateColumn = filter.split(SEPARATOR_COLUMN);
    if (separateColumn.length === 2) {
        const separateOperator = separateColumn[1].split(SEPARATOR_START_VALUES);
        if (separateOperator.length === 2) {
            const separateEndParentheses = separateOperator[1].split(SEPARATOR_END_VALUES)[0];
            return separateEndParentheses.split(SEPARATOR_VALUES).filter(value => stringOnlyContainsLetters(value));
        }
    }
    return null;
};

const stringOnlyContainsLetters = string => {
    return /^[a-zA-Z]*$/.test(string);
};

const operatorValid = operator => {
    const logicOperatorAcronyms = Object.keys(logicOperators).map(operator => logicOperators[operator].acronym);
    if (!arrayContains(logicOperatorAcronyms, operator)) {
        console.error(
            `Logic operator [${operator}] for filter [${query}=${queries[query]}] is invalid, so it has been removed.`
        );
        return false;
    }
    return true;
};

const operatorValidForDataType = (operator, column) => {
    const filterTypeOperators = dataTypeOperators[column.dataType].map(op => op.acronym);

    if (!arrayContains(filterTypeOperators, operator)) {
        console.error(
            `Logic operator [${operator}] for filter [${query}=${queries[query]}] is not allowed for dataType [${column.dataType}]`
        );
        return false;
    }
    return true;
};

const valuesValid = (values, column) => {
    for (const value in values) {
        const parsedValue = parseTypeAndValue(value);
        if (column.dataType !== dataTypes.SELECT && column.dataType !== dataTypes.MULTI_SELECT) {
            if (parsedValue.pseudoType !== column.dataType) {
                console.error(`Value [${value}] is not correct data type. It has to be of type ${column.dataType}`);
                return false;
            }
        }
    }
    return true;
};

const valueCountAllowedForDataType = (values, column) => {
    if (values.length === 0) return false;
    if (values.length > 1) {
        if (column.dataType !== dataTypes.MULTI_SELECT) {
            return false;
        }
    }
    return true;
};
