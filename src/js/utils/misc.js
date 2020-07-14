/**
 * Debounce a function
 *
 * @param {Function} fn
 * @param {Integer} time
 */
export const debounce = (fn, time) => {
    let timeout;

    return function(...args) {
        const functionCall = () => fn.apply(this, args);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};

/**
 * Modulo for negative values as well
 *
 * @param {Integer} index
 * @param {Integer} length
 */
export const wrapRange = (index, length) => ((index % length) + length) % length;

/**
 * Limit number of decimals
 *
 * @param {Number} value
 * @param {Integer} numOfDecimals
 */
export const maxDecimals = (value, numOfDecimals) => {
    const d = Math.pow(10, numOfDecimals);
    return Math.round(value * d) / d;
};
