<template>
  <div class="container" id="register-page">
    <div class="row">
            <KanbanAppsInfo></KanbanAppsInfo>
            <div class="col-lg-6 backlay">
                <main class="form-signin">
                    <form @submit.prevent="registerToAppVue">
                        <h1 class="h3 mb-3 fw-normal text-center">Feel free to register</h1>
                        <label for="email-register" class="d-none">Email address</label>
                        <input v-model="email" type="email" id="email-register" class="form-control top" placeholder="Email address" autofocus>
                        <label for="password-register" class="d-none">Password</label>
                        <input v-model="password" type="password" id="password-register" class="form-control middle" placeholder="Password">
                        <label for="repeat-password-register" class="d-none">Repeat Password</label>
                        <input v-model="repeatPassword" type="password" id="repeat-password-register" class="form-control bottom" placeholder="Repeat Password">
                        <div class="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me"> I accept term & condition.
                            </label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                        <label  class="btn-reg-pad" for="back-to-sign-in">Have an account? </label>
                        <button v-on:click.prevent="backToSignIn" class="w-100 btn btn-lg btn-primary btn-reg-pad" type="submit">Back to Sign in</button>
                        <p class="mt-5 mb-3 text-center">&copy; 2021</p>
                    </form>
                </main>
        </div>
    </div>
</div>
</template>

<script>
import KanbanAppsInfo from './KanbanAppsInfo'
export default {
    name: 'RegisterPage',
    data() {
        return {
            email: '',
            password: '',
            repeatPassword: ''
        }
    },
    methods: {
        registerToAppVue() {
            this.$emit('emitRegisterContent', { email : this.email, password : this.password, repeatPassword: this.repeatPassword });
            this.email = '';
            this.password = '';
            this.repeatPassword = '';
        },
        backToSignIn() {
            this.$emit('emitToSignIn', { status : true })
        }
    },
    components: {
        KanbanAppsInfo
    }
}
</script>

<style>

</style>