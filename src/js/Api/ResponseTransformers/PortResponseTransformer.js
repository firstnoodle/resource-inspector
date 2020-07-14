export default (data, headers) => {
    // https://github.com/axios/axios/blob/master/examples/transform-response/index.html
    // a regular map of forEach will apparently disrupt some internal axios process
    // so this is the solution
    Object.keys(data).forEach(key => {
        data[key] = {
            name: '__' + data[key].name + '__',
            code: '__' + data[key].code + '__',
            country: '__' + data[key].country + '__',
        };
    });
    return data;
};
