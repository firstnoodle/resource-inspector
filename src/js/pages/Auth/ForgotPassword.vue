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
        <el-button type="primary" @click="submit" :disabled="submitButtonDisabled">Reset password</el-button>
    </div>
</template>

<script>
import { validateEmail } from '~/utils/validation.js';

export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: null,
            emailValid: false,
        };
    },
    computed: {
        submitButtonDisabled() {
            return !this.emailValid;
        },
    },
    methods: {
        async submit() {
            try {
                await this.$store.dispatch('app/forgotPassword', { email: this.email });

                this.$root.$emit('notify', {
                    title: 'Check your email',
                    type: 'success',
                });
            } catch (error) {
                this.$root.$emit('notify', {
                    title: 'Sorry',
                    message: 'But we dont recognize this email',
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
