<template>
<div>
    <NavbarAfter :logoutBtn="logoutBtn"></NavbarAfter>
    <TitleHomepage :openAddTaskForm="openAddTask"></TitleHomepage>

    <AddTaskModal 
    @emitCloseAddTask="closeAddTaskHomepage" 
    @emitAddTaskModal="addTaskDataFromHomePage" 
    v-if="addTaskForm" >
    </AddTaskModal>

    <EditTaskModal 
    @emitCloseEditTask="closeEditTaskHomepage"
    @emitEditDataTask="editTaskFinalize"
    :currentDataForPopuplate="currentTaskData"
    v-if="editTaskForm">
    </EditTaskModal>

    <EditCategoryModal
    @emitCloseCategoryModal="closeEditCategoryHomepage" 
    @emitEditCategoryModal="editCategoryFinalize"
    :currentDataForPopuplate="currentTaskData"
    v-if="editCategoryForm">
    </EditCategoryModal>


    <div class="container-fluid">
        <div class="row">
            <KanbanBoardlist 
                :catName="'Backlog'"
                :dataTask="listBacklog" 
                :categoryAvailable="categoryAvailable">
            </KanbanBoardlist>
            <KanbanBoardlist 
                :catName="'Todo'"
                :dataTask="listTodo" 
                :categoryAvailable="categoryAvailable">
            </KanbanBoardlist>
            <KanbanBoardlist 
                :catName="'Doing'"
                :dataTask="listDoing" 
                :categoryAvailable="categoryAvailable">
            </KanbanBoardlist>
            <KanbanBoardlist 
                :catName="'Done'"
                :dataTask="listDone" 
                :categoryAvailable="categoryAvailable">
            </KanbanBoardlist>
        </div>
    </div>
</div>
</template>

<script>

import NavbarAfter from '../components/NavbarAfterLogin';
import TitleHomepage from '../components/TitleHomepageAddBtn';
import KanbanBoardlist from '../components/KanbanBoardlist';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import EditCategoryModal from '../components/EditCategoryModal';
import Swal from 'sweetalert2'

export default {
    props: ['dataTask', 'categoryAvailable', 'logoutBtn'],
    name: 'Homepage',
    data() {
        return {
            addTaskForm: false,
            editTaskForm: false,
            editCategoryForm:false,
            currenTaskId: '',
        }
    },
    methods: {
        // ADD TASK
        openAddTask() {
            this.addTaskForm = true;
        },
        closeAddTaskHomepage({ status }) {
            this.addTaskForm = status;
        },
        addTaskDataFromHomePage(data) {
            this.$emit('emitAddTaskData', data)
            this.addTaskForm = data.status;
        },
        // EDIT CATEGORY
        editCategoryReceive(id) {
            this.currenTaskId = id;
            if(this.currentTaskData[0].User.email === localStorage.email) {
                console.log("It's yours")
                this.editCategoryForm = true;
            } else {
                console.log("It's Not Yours")
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "It's not yours, you can only edit your task!",
                    footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
                })
            }
        },
        closeEditCategoryHomepage(status){
            this.editCategoryForm = status;
            this.currenTaskId = '';
        },
        editCategoryFinalize(data) {
            this.$emit('emitCategoryToApp', { data, id : this.currenTaskId });
            this.editCategoryForm = data.status;
            this.currenTaskId = ''
        },
        // EDIT TASK
        editTaskReceive(id) {
            this.currenTaskId = id;
            if(this.currentTaskData[0].User.email === localStorage.email) {
                console.log("It's Yours")
                this.editTaskForm = true;
            } else {
                console.log("It's Not Yours")
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "It's not yours, you can only edit your task!",
                    footer: '<a><i class="fab fa-korvue"></i> Kanban - your tracking partner -</a>'
                })
            }
        },
        closeEditTaskHomepage(status) {
            this.editTaskForm = status;
            this.currenTaskId = '';
        },
        editTaskFinalize(data) {
            this.$emit("emitEditTaskToApp", { title: data.title, id : this.currenTaskId })
            this.editTaskForm = data.status;
            this.currenTaskId = '';
        },
        // FIND OWNER
        findOwnerEmail() {
            return this.dataTask.filter(el => {return el.User.email === localStorage.email})
        }
    },
    components: {
        TitleHomepage,
        NavbarAfter,
        KanbanBoardlist,
        AddTaskModal,
        EditTaskModal,
        EditCategoryModal
    },
    computed: {
        listBacklog: function() {
            return this.dataTask.filter(el => {return el.category === 'backlog'})
        },
        listTodo: function() {
            return this.dataTask.filter(el => {return el.category === 'todo'})
        },
        listDoing: function() {
            return this.dataTask.filter(el => {return el.category === 'doing'})
        },
        listDone: function() {
            return this.dataTask.filter(el => {return el.category === 'done'})
        },
        currentTaskData: function() {
            return this.dataTask.filter(el => {return el.id === this.currenTaskId})
        },

    },
    created() {
        // this.loadTask()
        // fetchTask
    },
    beforeUpdate() {
        // console.log(this.dataTask, 'Dr BU HP')
        // console.log(this.taskCatBL)
    }

}
</script>

<style>

</style>