<template>
<div>
<nav :logoutBtn="logoutBtn" id="nav-after-login" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="/asset/kanban-logo-brand.png" alt="" width="100" class="d-inline-block align-top brand-radius">
            </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Pricing</a>                       
                </li>
                <li class="nav-item">
                    <a class="nav-link" :params="params" :logoutButton=true href="#" v-on:click.prevent="logoutBtn">Logout</a>                      
                </li>
            </ul>
        </div>
        </div>
    </nav>
</template>

<script>

import GoogleLogin from 'vue-google-login';

export default {
    name: 'NavbarAfterLogin',
    props: ['logoutBtn'],
    data() {
        return {
            params: {
                    client_id: "64286484094-9papg0k5moappbj7gk3qi1jpiiee5fv4.apps.googleusercontent.com"
                },
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        toGsignOut() {
            this.$parent.$parent.signOut()
        }
    }

}
</script>

<style>

</style>