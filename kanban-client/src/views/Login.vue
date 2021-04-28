<template>
    <div>
        <NavbarBefore></NavbarBefore>
        <LoginContent @emitContentLogin="loginAtPage" @emitToRegisterPage="toRegisterAtLoginPage"></LoginContent>
    </div>
</template>

<script>
import NavbarBefore from '../components/NavbarBeforeLogin.vue';
import LoginContent from '../components/LoginContent.vue';

export default {
    name: 'Login',
    methods: {
        loginAtPage(data) {
            this.$emit('emitPageLogin', data)
        },
        toRegisterAtLoginPage(status) {
            // console.log(status)
            this.$emit('emitToRegisterPageFromLogin', status)
        }
    },
    components : {
        NavbarBefore,
        LoginContent,
    }

}
</script>

<style>

</style>