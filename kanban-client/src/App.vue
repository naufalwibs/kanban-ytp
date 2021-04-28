<template>
  <div>
    <Login v-if="loginPage" @emitPageLogin="login" @emitToRegisterPageFromLogin="toRegisterPageApp"></Login>
    <Register v-if="registerPage" @emitRegisterData="registerUser" @emitBackToSignInPage="toLogingPageApp"></Register>
    <Homepage v-if="homePage" 
    :dataTask="tasks" 
    :logoutBtn="logout"
    @emitAddTaskData="addTaskApp"
    @emitCategoryToApp="editCategoryTaskApp"
    @emitEditTaskToApp="editTaskApp"
    ></Homepage>
  </div>
</template>

<script>
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Homepage from './views/Homepage.vue';
import axios from 'axios';
import Swal from 'sweetalert2';


export default {
  name: 'App',
  data() {
    return {
      loginPage: true,
      registerPage: false,
      homePage: false,
      baseURL: 'https://kanban-ytp-nw.herokuapp.com',
      tasks: [],
    }
  },
  components: {
    Login,
    Register,
    Homepage
    },
  methods: {
    onSignIn(googleUser) {
                var id_token = googleUser.getAuthResponse().id_token;
        
                axios({
                        method: 'POST',
                        url:  this.baseURL + "/loginGoogle",
                        data: {
                            token: id_token
                        }
                })
                .then(response => {
                        localStorage.setItem('id', response.data.id)
                        localStorage.setItem('email', response.data.email)
                        localStorage.setItem('access_token', response.data.access_token)
                        this.checkAccessToken()
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Success',
                            text: `Welcome to the hood, ${localStorage.email.split('@')[0]}!`,
                            footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
                        })
                })
                .catch(err => {
                        console.log(err)
                })
            },
    
    signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.');
                });
        },

    checkAccessToken() {
      if (localStorage.access_token) {
        this.loginPage = false;
        this.registerPage = false;
        this.homePage = true;
        this.fetchTask()
      } else {
        this.loginPage = true;
        this.registerPage = false;
        this.homePage = false;
      }
    },

    fetchTask() {
      axios({
        method: 'GET',
        url: this.baseURL + '/tasks',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.tasks = response.data.tasks
      })
      .catch(err => {
        console.log(err)
      })
    },

    fetchTaskById(id) {
      console.log('Task by id' + id)
    },

    login(user) {
      let { email, password } = user;
      axios({
        method: 'POST',
        url: this.baseURL + '/login',
        data: {
          email,
          password
        }
      })
      .then(response => {
        let user = response.data;
        localStorage.setItem('id', user.id);
        localStorage.setItem('email', user.email);
        localStorage.setItem('access_token', user.access_token);
        this.checkAccessToken()
        Swal.fire({
            icon: 'success',
            title: `Login Success`,
            text: `Welcome to the hood, ${localStorage.email.split('@')[0]}!`,
            footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
        })
      })
      .catch(err => {
        console.log({err})
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`,
          footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
        })
      })
    },

    logout() {
      Swal.fire({
            icon: 'success',
            title: 'Logout Success',
            text: `Good bye ${localStorage.email.split('@')[0]}, we'll miss you. See you soon!`,
            footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
        })
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('access_token');
      this.checkAccessToken();
      this.signOut()
    },

    registerUser(emit) {
      let newUser = emit.user;
      let { email, password, repeatPassword } = newUser;

      if (password == repeatPassword) {
        axios({
          method: 'POST',
          url: this.baseURL + '/register',
          data: {
            email,
            password
          }
        })
        .then(() => {
          console.log('Succesfully Registered', 'Please Login to Continue')
          Swal.fire({
            icon: 'success',
            title: 'Register Success',
            text: `Please Login to Continue!`,
            footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
          })
          this.checkAccessToken();
        })
        .catch((err) => {
          console.log({err})
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Register Failed`,
            footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
          })
        })
      } else {
        // console.log("Repeat Password didn't match")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Repeat Password must be same!",
          footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
        })
      }
    },

    addTaskApp(data) {
      // console.log(data)
      let { title, category } = data;
      axios({
        method: 'POST',
        url: this.baseURL + '/tasks',
        data: {
          title,
          category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        console.log('Task Successfully Created');
        Swal.fire({
            icon: 'success',
            title: 'Task Created',
            text: `Task Successfully Created!`,
            footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
          })
        this.fetchTask()
      })
      .catch(err => {
        console.log(err)
      })
    },

    deleteTaskApp(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios({
              method: 'DELETE',
              url: this.baseURL + '/tasks/' + id,
              headers: {
                access_token: localStorage.access_token
              }
              })
            .then((res) => {
              Swal.fire(
                  'Deleted!',
                  res.data.message,
                  'success'
                )
                this.fetchTask();
              })
            .catch((err) => {
                console.log({err})
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: `${err.response.statusText}, you can only delete your task!`,
                  footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
                })
              })
        }
      })
    },

    editTaskApp(response) {
      // console.log(response)
      let { title, id } = response;
      axios({
        method: 'PUT',
        url: this.baseURL + '/tasks/' + id,
        data: {
          title
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then((res) => {
        // console.log(res)
        // console.log('Task Edited');
        Swal.fire({
                icon: 'success',
                title: 'Task Edited',
                text: res.data.message,
                footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
        })
        this.fetchTask()
      })
      .catch(err => {
        console.log({err})
      })
    },

    editCategoryTaskApp(response){
      let category = response.data.category;
      let id = response.id;
      axios({
        method: 'PATCH',
        url: this.baseURL + '/tasks/' + id,
        data: {
          category
        },
        headers: {
          access_token: localStorage.access_token,
        }
      })
      .then((res) => {
        console.log(res)
        console.log('Sucessfully Edited Category')
        Swal.fire({
                icon: 'success',
                title: 'Task Edited',
                text: res.data.message,
                footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
        })
        this.fetchTask()
      })
      .catch(err => {
        console.log(err)
      })

    },

    toRegisterPageApp({ status }) {
      this.registerPage = status;
      this.loginPage = false;
    },

    toLogingPageApp({ status }) {
      this.loginPage = status;
      this.registerPage = false;
    }

  },

  created() {
    this.checkAccessToken();
  }
};
</script>

<style scoped>
</style>