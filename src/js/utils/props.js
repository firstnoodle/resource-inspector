import Vue from 'vue';

/**
 * Get a nested prop
 * @param {Object} obj
 * @param {Array} props
 */

export const getNestedProp = (obj, props) => {
    const prop = props.shift();
    if (!obj[prop] || !props.length) {
        return obj[prop];
    }
    return getNestedProp(obj[prop], props);
};

/**
 * Easily set a nested prop using Vue.set
 *
 * @param {Object} obj
 * @param {Array} props
 * @param {*} value
 */

export const setNestedProp = (obj, props, value) => {
    const prop = props.shift();
    if (!obj[prop]) {
        Vue.set(obj, prop, {});
    }
    if (!props.length) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            obj[prop] = { ...obj[prop], ...value };
        } else {
            obj[prop] = value;
        }
        return;
    }
    setNestedProp(obj[prop], props, value);
};

/**
 * Easily delete a nested prop using Vue.delete
 *
 * @param {Object} obj
 * @param {Array} props
 */
export const deleteNestedProp = (obj, props) => {
    const prop = props.shift();
    if (!obj[prop]) {
        return;
    }
    if (!props.length) {
        Vue.delete(obj, prop);
        return;
    }
    deleteNestedProp(obj[prop], props);
};
