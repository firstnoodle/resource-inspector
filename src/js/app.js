import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from '~/store/index.js';
import globals from './mixins/globals.js';

Vue.mixin(globals);

new Vue({
    el: '#app',
    router,
    store,
    ...App,
});
