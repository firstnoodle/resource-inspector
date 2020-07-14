<template>
    <div id="login">
        <h1 v-if="$route.query.redirect">You need to log in to access this page</h1>
        <el-input
            autocomplete="on"
            name="email"
            placeholder="your@email.com"
            type="email"
            v-model="email"
            @input="validate"
        />
        <el-input placeholder="password" v-model="password" show-password name="password" />
        <el-button type="primary" @click="submit" :disabled="loginButtonDisabled">Login</el-button>
        <router-link :to="{ name: 'register' }">Dont have an account</router-link>
        <router-link :to="{ name: 'forgot-password' }">Forgot my password</router-link>
    </div>
</template>

<script>
import { validateEmail } from '~/utils/validation.js';

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            emailValid: false,
        };
    },
    computed: {
        loginButtonDisabled() {
            return !this.emailValid || !this.password;
        },
    },
    methods: {
        validate() {
            this.emailValid = validateEmail(this.email);
        },
        async submit() {
            try {
                await this.$store.dispatch('app/login', { email: this.email, password: this.password });
                this.$router.push({ name: this.$route.query.redirect || 'dashboard' });

                this.$root.$emit('notify', {
                    title: 'Welcome ' + this.$store.getters['app/user'].name,
                    message:
                        'You are now logged in. If you wish to try our new Vessel Forecasts, please get in touch with us through Intercom.',
                    type: 'success',
                });
            } catch (error) {
                this.$root.$emit('notify', {
                    title: 'Ups..',
                    message: 'It seems like you might have entered wrong username or password.',
                    type: 'error',
                });
            }
        },
    },
};
</script>
