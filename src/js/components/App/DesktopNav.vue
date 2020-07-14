<template>
    <nav :class="{ 'is-collapsed': collapsed }">
        <header>
            <svg id="logo-tiny" width="32" height="12" viewBox="0 0 32 12" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.068.5c2.465 0 3.373.592 3.43 2.323L19.5 3h-1c0-1.23-.379-1.5-2.432-1.5l-.425.005c-1.67.042-2.11.366-2.141 1.371L13.5 3.5c0 .569.576.97 1.85 1.215l.315.055.85.124c1.93.289 2.91.876 2.981 2.423l.004.183V9c0 1.73-1.31 2.5-3.5 2.5-2.114 0-3.409-.718-3.495-2.325L12.5 9V8h1v1c0 1.035.79 1.5 2.5 1.5 1.636 0 2.43-.425 2.496-1.368L18.5 9V7.5c0-.98-.515-1.35-1.935-1.586l-1.147-.17c-1.787-.299-2.829-.933-2.913-2.09L12.5 3.5V3c0-1.847.984-2.5 3.568-2.5zM2.77 3.502L3 3.5c.408 0 .68.014 1.008.072.832.148 1.415.543 1.485 1.277L5.5 5v2h-4v1c0 .32.48.478 1.316.498L3 8.5c.352 0 .58-.011.832-.056.423-.075.626-.2.662-.381L4.5 8v-.5h1V8c0 .832-.604 1.27-1.492 1.428-.327.058-.6.072-1.008.072-.545 0-.916-.027-1.325-.144C1.017 9.168.568 8.773.507 8.148L.5 8V5c0-.832.604-1.27 1.492-1.428.262-.047.489-.065.778-.07zm6 0L9 3.5c.408 0 .68.014 1.008.072.832.148 1.415.543 1.485 1.277L11.5 5v2h-4v1c0 .32.48.478 1.316.498L9 8.5c.352 0 .58-.011.832-.056.423-.075.626-.2.662-.381L10.5 8v-.5h1V8c0 .832-.604 1.27-1.492 1.428-.327.058-.6.072-1.008.072-.545 0-.916-.027-1.325-.144-.658-.188-1.107-.583-1.168-1.208L6.5 8V5c0-.832.604-1.27 1.492-1.428.262-.047.489-.065.778-.07zm14 0L23 3.5c.408 0 .68.014 1.008.072.832.148 1.415.543 1.485 1.277L25.5 5v2h-4v1c0 .32.48.478 1.316.498L23 8.5c.352 0 .58-.011.832-.056.423-.075.626-.2.662-.381L24.5 8v-.5h1V8c0 .832-.604 1.27-1.492 1.428-.327.058-.6.072-1.008.072-.545 0-.916-.027-1.325-.144-.658-.188-1.107-.583-1.168-1.208L20.5 8V5c0-.832.604-1.27 1.492-1.428.262-.047.489-.065.778-.07zm6 0L29 3.5c.408 0 .68.014 1.008.072.832.148 1.415.543 1.485 1.277L31.5 5v4.25h-.873c-.185.08-.393.138-.62.178-.26.047-.488.065-.777.07L29 9.5c-.408 0-.68-.014-1.008-.072-.832-.148-1.415-.543-1.485-1.277L26.5 8v-.75c0-.832.604-1.27 1.492-1.428l.16-.023.305-.03.238-.013c.044-.002.092-.004.142-.004L30.5 5.75V5c0-.216-.198-.36-.668-.444-.202-.036-.388-.05-.634-.054L29 4.5c-.352 0-.58.011-.832.056-.423.075-.626.2-.662.381L27.5 5h-1c0-.832.604-1.27 1.492-1.428.262-.047.489-.065.778-.07zM30.5 8V6.75H29c-.352 0-.58.011-.832.056-.423.075-.626.2-.662.381l-.006.063V8c0 .216.198.36.668.444.202.036.388.05.634.054h.396c.246-.004.432-.018.634-.054.423-.075.626-.2.662-.381L30.5 8zM3.198 4.502L3 4.5c-.352 0-.58.011-.832.056-.423.075-.626.2-.662.381L1.5 5v1h3V5c0-.195-.16-.33-.535-.417l-.133-.027c-.202-.036-.388-.05-.634-.054zm6 0L9 4.5c-.352 0-.58.011-.832.056-.423.075-.626.2-.662.381L7.5 5v1h3V5c0-.195-.16-.33-.535-.417l-.133-.027c-.202-.036-.388-.05-.634-.054zm14 0L23 4.5c-.352 0-.58.011-.832.056-.423.075-.626.2-.662.381L21.5 5v1h3V5c0-.195-.16-.33-.535-.417l-.133-.027c-.202-.036-.388-.05-.634-.054z"
                    fill="#FFF"
                    fill-rule="nonzero"
                />
            </svg>
            <svg id="logo" width="84" height="31" viewBox="0 0 84 31" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M41.146 2.002L41.5 2C47.22 2 50 3.456 50 6.45v3.319h-2.833V7.204c0-2.051-1.907-2.727-5.667-2.727l-.61.007c-3.356.073-5.056.783-5.056 2.72v2.262c0 1.756 1.28 2.86 3.804 3.283l3.583.558c4.561.722 6.779 2.426 6.779 5.21v6.033c0 2.932-2.666 4.389-8.146 4.448L41.5 29c-5.72 0-8.5-1.456-8.5-4.45v-3.319h2.834v2.565c0 2.051 1.906 2.703 5.666 2.703l.61-.006c3.356-.07 5.057-.76 5.057-2.697v-4.525c.058-1.75-1.222-2.86-3.806-3.283l-3.582-.558C35.28 14.72 33 13.22 33 10.975V6.45c0-2.932 2.666-4.389 8.146-4.448zM75.5 9c3.939 0 6.376 1.144 6.495 3.433l.005.178V23.72h-2.754v-.202c-1.011.32-2.272.483-3.746.483-3.938 0-6.376-1.145-6.495-3.433L69 20.39v-1.445c0-1.898 1.475-3.449 3.332-3.55l.193-.005h6.72v-2.222c0-1.297-1.542-1.945-3.745-1.945-1.71 0-3.191.601-3.299 1.803l-.006.142v.222H69.44v-.778C69.44 10.204 71.782 9 75.5 9zm-16 0c4.04 0 6.5 1.204 6.5 3.611v5H55.754v2.222c0 1.297 1.543 1.945 3.746 1.945 2.203 0 3.746-.648 3.746-1.945v-1.11H66v1.666C66 22.796 63.54 24 59.5 24S53 22.796 53 20.389V12.61C53 10.204 55.46 9 59.5 9zm-36 0c4.04 0 6.5 1.204 6.5 3.611v5H19.754v2.222c0 1.297 1.543 1.945 3.746 1.945 2.203 0 3.746-.648 3.746-1.945v-1.11H30v1.666C30 22.796 27.54 24 23.5 24S17 22.796 17 20.389V12.61C17 10.204 19.46 9 23.5 9zm-15 0c4.04 0 6.5 1.204 6.5 3.611v5H4.754v2.222c0 1.297 1.543 1.945 3.746 1.945 2.203 0 3.746-.648 3.746-1.945v-1.11H15v1.666C15 22.796 12.54 24 8.5 24S2 22.796 2 20.389V12.61C2 10.204 4.46 9 8.5 9zm70.746 8.611h-5.73c-.924 0-1.682.719-1.756 1.632l-.006.146v.444c0 1.296 1.543 1.945 3.746 1.945 2.125 0 3.635-.603 3.74-1.808l.006-.137v-2.222zM59.5 11.222c-2.203 0-3.746.649-3.746 1.945v2.222h7.492v-2.222c0-1.296-1.543-1.945-3.746-1.945zm-36 0c-2.203 0-3.746.649-3.746 1.945v2.222h7.492v-2.222c0-1.296-1.543-1.945-3.746-1.945zm-15 0c-2.203 0-3.746.649-3.746 1.945v2.222h7.492v-2.222c0-1.296-1.543-1.945-3.746-1.945z"
                    fill="#FFF"
                    fill-rule="evenodd"
                />
            </svg>
        </header>
        <main>
            <router-link :to="{ name: 'dashboard' }" :exact="true" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="dashboard" />
                </span>
                <span class="nav-item__label">Dashboard</span>
            </router-link>
            <router-link :to="{ name: 'news' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="page" />
                </span>
                <span class="nav-item__label">News</span>
            </router-link>
            <router-link :to="{ name: 'vessel-forecasts' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="telescope" />
                </span>
                <span class="nav-item__label">Vessel Forecasts</span>
            </router-link>
            <router-link :to="{ name: 'services' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="service" />
                </span>
                <span class="nav-item__label">Liner Services</span>
            </router-link>
            <router-link :to="{ name: 'ports-terminals' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="anchor" />
                </span>
                <span class="nav-item__label">Ports &amp; Terminals</span>
            </router-link>
            <router-link :to="{ name: 'vessels' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="vessel" />
                </span>
                <span class="nav-item__label">Vessels</span>
            </router-link>
            <router-link :to="{ name: 'companies' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="flag" />
                </span>
                <span class="nav-item__label">Companies</span>
            </router-link>
        </main>

        <footer>
            <router-link v-if="user" :to="{ name: 'settings' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="user" />
                </span>
                <span class="nav-item__label">{{ user.name }}</span>
            </router-link>
            <router-link v-else :to="{ name: 'register' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="sign-up" />
                </span>
                <span class="nav-item__label">Register</span>
            </router-link>

            <a v-if="user" class="nav-item" @click.prevent="logout">
                <span class="nav-item__icon">
                    <ee-icon icon="sign-out" />
                </span>
                <span class="nav-item__label">Logout</span>
            </a>
            <router-link v-else :to="{ name: 'login' }" class="nav-item">
                <span class="nav-item__icon">
                    <ee-icon icon="sign-in" />
                </span>
                <span class="nav-item__label">Login</span>
            </router-link>
            <a class="nav-item" @click.prevent="collapsed = !collapsed">
                <span class="nav-item__icon">
                    <ee-icon :icon="navToggleIcon" />
                </span>
                <span class="nav-item__label">{{ navToggleLabel }}</span>
            </a>
        </footer>
    </nav>
</template>

<script>
import { mapState } from 'vuex';
import HttpClient from '~/Api/Clients/BaseClient.js';
import AuthClient from '~/Api/Clients/AuthClient.js';
import eeIcon from '~/elements/eeIcon.vue';

export default {
    name: 'DesktopNav',
    components: { eeIcon },
    data() {
        return {
            collapsed: false,
        };
    },
    computed: {
        ...mapState('app', ['user']),
        navToggleIcon() {
            return this.collapsed ? 'angle-right' : 'angle-left';
        },
        navToggleLabel() {
            return this.collapsed ? 'Expand menu' : 'Collapse menu';
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch('app/logout');
            if (this.$route.meta.requiresAuth) {
                this.$router.push({ name: 'dashboard' });
            }
        },
    },
};
</script>
