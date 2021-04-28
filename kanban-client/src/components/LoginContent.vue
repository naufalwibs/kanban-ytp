<template>
  <div class="container" id="login-page">
    <div class="row">
            <KanbanAppsInfo></KanbanAppsInfo>
            <div class="col-lg-6 backlay">
                <main class="form-signin">
                    <form>
                        <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
                        <label for="inputEmail" class="d-none">Email address</label>
                        <input v-model="email" type="email" id="email-login" class="form-control" placeholder="Email address" autofocus>
                        <label for="inputPassword" class="d-none">Password</label>
                        <input v-model="password" type="password" id="password-login" class="form-control" placeholder="Password">
                        <div class="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me"> Remember me
                            </label>
                        </div>
                        <button @click.prevent="loginAtContent" class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        <label class="btn-reg-pad" for="register">Don't have an account? </label>
                        <button v-on:click.prevent="toRegisterPage" class="w-100 btn btn-lg btn-primary btn-reg-pad" type="submit">Register</button>
                        <div class="d-flex justify-content-center margin-top-gbtn">
                            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
                        </div>
                        <p class="mt-5 mb-3 text-center">&copy; 2021</p>
                    </form>
                </main>
        </div>
    </div>
</div>
</template>

<script>

import KanbanAppsInfo from './KanbanAppsInfo';
import GoogleLogin from 'vue-google-login';

export default {
    data() {
        return {
            email:'',
            password:'',
            params: {
                    client_id: "64286484094-9papg0k5moappbj7gk3qi1jpiiee5fv4.apps.googleusercontent.com"
                },
            renderParams: {
                    width: 250,
                    height: 40,
                    longtitle: true
                }
        }
    },
    methods: {
        loginAtContent() {
            this.$emit('emitContentLogin', { email : this.email, password : this.password })
            this.email = '';
            this.password = '';
        },
        toRegisterPage() {
            // console.log('Masuk sini kok')
            this.$emit('emitToRegisterPage', { status : true })
        },
        onSuccess(googleUser) {
            // console.log(googleUser);
            // console.log(googleUser.getBasicProfile());
            this.$parent.$parent.onSignIn(googleUser)
        }
        
    },
    components : {
        KanbanAppsInfo,
        GoogleLogin
    }
}
</script>

<style>

</style>