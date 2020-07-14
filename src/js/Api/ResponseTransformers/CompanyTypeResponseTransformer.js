/**
 * Transform key: values into label,value sets
 * for use as el-option in el-select
 */
export default data => {
    const transformed = [];
    for (const key in data) {
        transformed.push({
            label: data[key],
            value: key,
        });
    }
    return transformed;
};
