<template>
    <div id="app">
        <desktop-nav />
        <router-view />
    </div>
</template>

<script>
import DesktopNav from './components/App/DesktopNav.vue';

export default {
    name: 'App',
    components: { DesktopNav },
    beforeCreate() {
        this.$store.dispatch('app/getCookie');
    },
    created() {
        console.log('App created!');
        this.$root.$on('notify', notification => {
            this.$notify(notification);
        });
    },
};
</script>
