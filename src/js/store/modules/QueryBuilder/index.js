import { getDefaultState } from './state.js';
import { getters } from './getters.js';
import { actions } from './actions.js';
import { mutations } from './mutations.js';

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state: getDefaultState(),
};
