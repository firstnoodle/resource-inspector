<template>
    <div>
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
        <el-button type="primary" @click="submit" :disabled="submitButtonDisabled">Submit</el-button>
    </div>
</template>

<script>
import { validateEmail } from '~/utils/validation.js';

export default {
    name: 'ForgotPassword',
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
        submitButtonDisabled() {
            return (
                !this.emailValid ||
                !this.password ||
                !this.passwordConfirmation ||
                this.password !== this.passwordConfirmation
            );
        },
    },
    created() {
        this.email = this.$route.query.email || null;
        this.validate();
    },
    methods: {
        async submit() {
            try {
                await this.$store.dispatch('app/resetPassword', {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation,
                    token: this.$route.query.token,
                });
                this.$router.push({ name: 'dashboard' });

                this.$root.$emit('notify', {
                    title: 'Success',
                    message: 'Your password has been reset',
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
