const ID_PREFIX = '__id_prefix__' + Date.now() + '_';
let uid = 0;

export const uniqueId = () => {
    return ID_PREFIX + uid++;
};
