import { DATE_REGEX, DATE_TIME_REGEX, FLOAT_REGEX, INT_REGEX } from '~/utils/regex.js';

// Get parsed value, type, and pseudoType (int,float,date,boolean,array,object)
// based on any input type also stringified values
export const parseTypeAndValue = value => {
    switch (typeof value) {
        case 'string':
            // dateString, boolean, float, int?
            if (value === 'true' || value === 'false') return parseTypeAndValue(value === 'true');
            if (FLOAT_REGEX.test(value))
                return { type: typeof parseFloat(value), pseudoType: 'float', value: parseFloat(value) };
            if (INT_REGEX.test(value))
                return { type: typeof parseInt(value), pseudoType: 'int', value: parseFloat(value) };
            if (DATE_REGEX.test(value)) {
                if (moment(value)._isValid) {
                    return { type: typeof value, pseudoType: 'date', value: moment(value).format('YYYY-MM-DD') };
                }
            }
            if (DATE_TIME_REGEX.test(value)) {
                if (moment(value)._isValid) {
                    return {
                        type: typeof value,
                        pseudoType: 'date_time',
                        value: moment(value).format('YYYY-MM-DD HH:mm'),
                    };
                }
            }
            return { type: typeof value, pseudoType: typeof value, value };

        case 'boolean':
            return { type: typeof value, pseudoType: typeof value, value: value === 'true' };

        case 'number':
            if (FLOAT_REGEX.test(value)) return { type: typeof value, pseudoType: 'float', value };
            if (INT_REGEX.test(value)) return { type: typeof value, pseudoType: 'int', value };
            return { type: typeof value, value };

        case 'object':
            // array or object
            if (value.length !== undefined) {
                return { type: typeof value, pseudoType: 'array', value };
            } else {
                // moment object
                if (value._isAMomentObject && value._isValid) {
                    return { type: typeof value, pseudoType: 'date', value: value.format('YYYY-MM-DD') };
                }
            }
            return { type: typeof value, pseudoType: typeof value, value };

        case 'function':
            return { type: typeof value, value };

        default:
            console.error('unknown type', typeof value);
    }
    return null;
};
