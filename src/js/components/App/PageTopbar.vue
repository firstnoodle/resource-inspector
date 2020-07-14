<template>
    <header id="page-topbar">
        <slot name="button" />
        <slot name="title" />
    </header>
</template>

<script>
export default {
    name: 'PageTopbar',
};
</script>
