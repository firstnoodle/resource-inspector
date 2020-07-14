<template>
    <main id="content">
        <page-topbar>
            <template #title>Dashboard</template>
        </page-topbar>
    </main>
</template>

<script>
import PageTopbar from '~/components/App/PageTopbar.vue';

export default {
    name: 'DashboardPage',
    components: { PageTopbar },
};
</script>
