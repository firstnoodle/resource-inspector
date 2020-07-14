<template>
    <span class="eesea-icon" :class="iconClass"></span>
</template>

<script>
export default {
    name: 'eeIcon',
    props: {
        icon: {
            type: String,
            default: 'anchor',
        },
    },
    computed: {
        iconClass() {
            return `eesea-icon-${this.icon}`;
        },
    },
};
</script>
