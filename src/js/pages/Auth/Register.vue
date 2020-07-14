<template>
    <div>
        <el-input autocomplete="on" name="name" placeholder="Enter your name" type="text" v-model="name" />
        <el-input
            autocomplete="on"
            name="email"
            placeholder="your@email.com"
            type="email"
            v-model="email"
            @input="validate"
        />
        <el-input placeholder="password" v-model="password" show-password name="password" />
        <el-input
            placeholder="confirm password"
            v-model="passwordConfirmation"
            show-password
            name="password_confirmation"
        />
        <el-button type="primary" @click="submit" :disabled="registerButtonDisabled">Register</el-button>
    </div>
</template>

<script>
import { validateEmail } from '~/utils/validation.js';

export default {
    name: 'Register',
    data() {
        return {
            email: null,
            name: null,
            password: null,
            passwordConfirmation: null,
            emailValid: false,
        };
    },
    computed: {
        registerButtonDisabled() {
            return (
                !this.name ||
                !this.emailValid ||
                !this.password ||
                !this.passwordConfirmation ||
                this.password !== this.passwordConfirmation
            );
        },
    },
    methods: {
        async submit() {
            try {
                await this.$store.dispatch('app/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                });
                this.$router.push({ name: 'dashboard' });

                this.$root.$emit('notify', {
                    title: 'Welcome ' + this.name,
                    message:
                        'We are very happy that you want to try our platform. Please get in touch if you any questions.',
                    type: 'success',
                    duration: 0,
                });
            } catch (error) {
                this.$root.$emit('notify', {
                    title: 'Ups..',
                    message:
                        'Something went wrong trying to register your credentials. Please try again later or contact us via Intercom.',
                    type: 'error',
                });
            }
        },

        validate() {
            this.emailValid = validateEmail(this.email);
        },
    },
};
</script>
