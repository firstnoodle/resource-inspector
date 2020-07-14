<template>
    <main id="content">
        <page-topbar>
            <template #title>Settings</template>
        </page-topbar>
    </main>
</template>

<script>
import PageTopbar from '~/components/App/PageTopbar.vue';

export default {
    name: 'SettingsPage',
    components: { PageTopbar },
};
</script>
