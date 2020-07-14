/**
 * Determine if a value is an Object.
 *
 * @param {Object} obj
 */
export const isObject = obj => obj !== null && typeof obj === 'object';

export const objectIsEmpty = obj => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};

/**
 * Get a nested value by passing a dot-separated string.
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} nullValue
 */
export const getValueFromPath = (obj, path, nullValue = null) => {
    if (typeof obj !== 'object') return nullValue;
    const props = path.split('.');
    const prop = props.shift();
    if (!props.length || !obj[prop]) {
        return obj[prop] || nullValue;
    }
    return getValueFromPath(obj[prop], props.join('.'), nullValue);
};

/**
 * Check if an Array contains a given value
 *
 * @param {Array} arr
 * @param {*} value
 */
export const arrayContains = (arr, value) => arr.indexOf(value) > -1;

/**
 * Check if two Arrays or Objects a identical
 *
 * @param {Array|Object} value
 * @param {Array|Object} other
 */
export const isEqual = (value, other) => {
    // Get the value type
    let type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    let valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    let otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;

    // Compare two items
    let compare = function(item1, item2) {
        // Get the object type
        let itemType = Object.prototype.toString.call(item1);

        // If an object or array, compare recursively
        if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
            if (!isEqual(item1, item2)) return false;
        }

        // Otherwise, do a simple comparison
        else {
            // If the two items are not the same type, return false
            if (itemType !== Object.prototype.toString.call(item2)) return false;

            // Else if it's a function, convert to a string and compare
            // Otherwise, just compare
            if (itemType === '[object Function]') {
                if (item1.toString() !== item2.toString()) return false;
            } else {
                if (item1 !== item2) return false;
            }
        }
    };

    // Compare properties
    if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;
};

export const arrayDiff = (array1, array2) => {
    let a = [],
        diff = [];

    for (let i = 0; i < array1.length; i++) {
        a[array1[i]] = true;
    }

    for (let i = 0; i < array2.length; i++) {
        if (a[array2[i]]) {
            delete a[array2[i]];
        } else {
            a[array2[i]] = true;
        }
    }

    for (let k in a) {
        diff.push(k);
    }

    return diff;
};
