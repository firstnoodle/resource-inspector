<template>
    <main id="content">
        <page-topbar>
            <template #title>Vessel Forecasts</template>
        </page-topbar>
    </main>
</template>

<script>
import PageTopbar from '~/components/App/PageTopbar.vue';

export default {
    name: 'VesselForecastsPage',
    components: { PageTopbar },
};
</script>
