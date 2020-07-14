<template>
    <main id="content">
        <page-topbar>
            <template #title>News</template>
        </page-topbar>
    </main>
</template>

<script>
import PageTopbar from '~/components/App/PageTopbar.vue';

export default {
    name: 'NewsPage',
    components: { PageTopbar },
};
</script>
