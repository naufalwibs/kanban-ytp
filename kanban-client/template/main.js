const baseURL = "http://localhost:3000";


function onSignIn(googleUser) {
    console.log(googleUser)
        var id_token = googleUser.getAuthResponse().id_token;

        axios({
                method: 'POST',
                url:  baseURL + "/loginGoogle",
                data: {
                    token: id_token
                }
        })
        .then(response => {
                // console.log(response)
                localStorage.setItem('id', response.id)
                localStorage.setItem('email', response.email)
                localStorage.setItem('access_token', response.access_token)
                app.user = response.data.email.split('@')[0]
                app.checkAccessToken();
        })
        .catch(err => {
                console.log(err)
        })
    }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//         auth2.signOut().then(function () {
//         console.log('User signed out.');
//         });
//     }



const app = new Vue({
    el: '#app',
    data: {
        user: '',
        email: '',
        password: '',
        repeatPassword: '',
        navbar: false,
        page: 'login',
        addTask: false,
        editCategory: false,
        editTask: false,
        category: '',
        newTask: '',
        kanbans: '',
        currentSelectedTask: '',
        currentTaskData: '',
        editTaskText: '',
    },
    methods: {

        btn_login() {
            axios({
                method: 'POST',
                url: baseURL + '/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                // console.log(response)
                const userLogin = response.data;
                    localStorage.setItem("id", userLogin.id);
                    localStorage.setItem("email", userLogin.email);
                    localStorage.setItem("access_token", userLogin.access_token);
                    this.user = userLogin.email.split('@')[0]
                    this.checkAccessToken();
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.email = '';
                this.password = '';
            })
        },

        btn_logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('email');
            this.user = '';
            this.checkAccessToken()
            this.signOut();
        },

        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.');
                });
        },

        onSignIn(googleUser) {
            console.log(googleUser)
                var id_token = googleUser.getAuthResponse().id_token;
        
                axios({
                        method: 'POST',
                        url:  baseURL + "/loginGoogle",
                        data: {
                            token: id_token
                        }
                })
                .then(response => {
                        localStorage.setItem('id', response.id)
                        localStorage.setItem('email', response.email)
                        localStorage.setItem('access_token', response.access_token)
                        app.user = response.data.email.split('@')[0]
                        app.checkAccessToken();
                })
                .catch(err => {
                        console.log(err)
                })
            },

        btn_register() {
            if (this.password === this.repeatPassword) {
                axios({
                    method: 'POST',
                    url: baseURL + '/register',
                    data: {
                        email: this.email,
                        password: this.password,
                    }
                })
                .then(response => {
                    console.log(response)
                    this.page = 'login';
                    console.log('Register Successfully, Please Login');
                })
                .catch(err => {
                    console.log(err)
                })
                .then(() => {
                    this.email = '';
                    this.password = '';
                    this.repeatPassword = '';
                })
            } else {
                throw new Error ('Password Must be same!')
            }

        },
        register_page() {
            this.page = 'register';
        },
        login_page() {
            this.page = 'login';
        },

        // CHECK LOGIN
        checkAccessToken() {
            if(localStorage.access_token) {
                this.page = 'kanban';
                this.fetchTask();
                this.navbar = true;
            } else {
                this.page = 'login',
                this.navbar = false;
            }
        },

        // ADD TASK
        openAddTask() {
            this.addTask = true;
        },
        closeAddTask() {
            this.addTask = false;
            this.category = '';
            this.newTask = '';
        },
        addKanban() {
            axios({
                method: 'POST',
                url: baseURL + '/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.newTask,
                    category: this.category,
                }
            })
            .then(() => {
                this.fetchTask();
                this.closeAddTask();
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.newTask = '';
                this.category = '';
            })
        },

        // PATCH CATEGORY
        openEditTaskCategory(id) {
            this.fetchTaskById(id);
            // if (this.currentTaskData.UserId == localStorage.id) {
                this.editCategory = true;
                this.currentSelectedTask = id;
            // } else {
            //     console.log(`You don't have permission`);
            //     this.currentTaskData = '';
            //     this.currentSelectedTask = '';
            // }
        },
        closeEditCategory() {
            this.editCategory = false;
            this.currentSelectedTask = '';
        },
        editCategoryKanban() {
            axios({
                method: 'PATCH',
                url: baseURL + '/tasks/' + this.currentSelectedTask,
                headers: {
                    access_token : localStorage.access_token,
                },
                data: {
                    category: this.category,
                }
            })
            .then(task => {
                this.closeEditCategory();
                this.fetchTask();
            })
            .catch(err => {
                console.log(err)
            })
            .then(() => {
                this.category = ''
            })

        },

        // EDIT TASK
        openEditTaskAll(id) {
            this.fetchTaskById(id);
            // if (this.currentTaskData.UserId == localStorage.id) {
                this.editTask = true;
                this.currentSelectedTask = id;
            // } else {
                // console.log(`You don't Have Permission to edit`)
                // this.currentTaskData = '';
                // this.currentSelectedTask = '';
            // }
        },
        closeEditTaskAll() {
            this.editTask = false;
            this.currentSelectedTask = '';
            this.category = '';
            this.currentTaskData = '';
        },
        editTaskAll() {
            axios({
                method: 'PUT',
                url: baseURL + '/tasks/' + this.currentSelectedTask,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title : this.editTaskText,
                    category : this.category,
                }
            })
            .then(() => {
                console.log('Edited Succesfuly')
                this.fetchTask()
                this.closeEditTaskAll()
            })
            .catch(err => {
                console.log(err)
            })
        },

        // DELETED TASK
        deleteTask(id) {
            this.fetchTaskById(id)
            // if (this.currentTaskData.UserId == localStorage.id) {
                let answer = confirm('Are you sure ?')
                if (answer) {
                    // console.log('deleted')
                    axios({
                        method: 'DELETE',
                        url: baseURL + '/tasks/' + id,
                        headers : {
                            access_token : localStorage.access_token
                        }
                    })
                    .then(() => {
                        console.log('Sucessfully Deleted');
                        this.fetchTask()
                    })
                    .catch(err => {
                        console.log(`You don't have permission`)
                    })
                } else {
                    console.log('Ooo okay, good thing I ask you')
                }
            // } else {
            //     console.log(`You Don't Have Permission to Delete`);
            //     this.currentTaskData = '';
            //     this.currentSelectedTask = '';
            // }

        }, 
        // FETCH TASK
        fetchTask() {
            axios({
                method: 'GET',
                url: baseURL + '/tasks',
                headers: {
                    access_token : localStorage.access_token
                }
            })
            .then(response => {
                console.log(response.data)
                this.kanbans = response.data;
            })
            .catch(err => [
                console.log(err)
            ])
        },

        // FETCH TASK BY ID
        fetchTaskById(id) {
            axios({
                method: 'GET',
                url: baseURL + '/tasks/' + id,
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(response => {
                // console.log(response.data.task)
                this.currentTaskData = response.data.task;
                this.category = this.currentTaskData.category;
                this.editTaskText = this.currentTaskData.title;
            })
            .catch(err => {
                this.fetchTask()
                this.closeAllProcess()
                console.log(err)
            })
        },

        closeAllProcess() {
            this.closeEditCategory();
            this.closeEditTaskAll();
        },

        // Date Changer
        changeDate(date) {
            let newDate = date.toLocaleString()
            return newDate
        }
        
    },

    // LifeCycle
    created() {
        console.log('System start');
        if (!this.user) {
            this.user = ''
        } else {
            this.user = localStorage.email.split('@')[0]
        }
        this.checkAccessToken()
    },
    beforeUpdate() {
        console.log('Before Updated Hit');
    },
    updated() {
        console.log('Updated Hit')
    },

    // COMPUTED
    computed: {
        dateFormat : function() {
            return this.currentTaskData.toLocaleString()
        }
    }


})