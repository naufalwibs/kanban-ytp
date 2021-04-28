<template>
    <div>
        <NavbarBefore></NavbarBefore>
        <RegisterContent 
        @emitRegisterContent="registerUserFromRegisterPage" 
        @emitToSignIn="backToSignInFromRegisterPage"></RegisterContent>
    </div>
</template>

<script>
import NavbarBefore from '../components/NavbarBeforeLogin.vue';
import RegisterContent from '../components/RegisterContent.vue'

export default {
    name: 'Register',
    methods: {
        registerUserFromRegisterPage(user) {
            this.$emit('emitRegisterData', { user })
        },
        backToSignInFromRegisterPage(status) {
            this.$emit('emitBackToSignInPage', status)
        }
    },
    components : {
        NavbarBefore,
        RegisterContent
    }

}
</script>

<style>

</style>