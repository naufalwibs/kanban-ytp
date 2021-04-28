<template>
    <div  class="scrollable">
        <div v-for="(datum, i) in data" :key="i" class="card">
            <div class="card-body">
            <div class="card bg-light" >
                <div class="card-header"> {{ datum.title }} </div>
                <div class="row align-self-center">
                    <div class="">
                    <p class="card-text p-kanban-top">By: {{ datum.User.email }} </p>
                    <p class="card-text p-kanban-bot"> {{ datum.createdAt }} </p>
                      <div class="crud-btn">
                          <i v-on:click="editTaskFromCard(datum.id)" class="fas fa-edit"></i>
                          <i v-on:click="editCategoryFromCard(datum.id)" class="fas fa-exchange-alt"></i>
                          <i v-on:click="deleteTaskFromCard(datum.id)" class="fas fa-trash-alt"></i>
                      </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KanbanCard',
    props: ['data'],
    methods: {
        editTaskFromCard(id) {
            this.$parent.$parent.editTaskReceive(id)
        },
        editCategoryFromCard(id) {
            this.$parent.$parent.editCategoryReceive(id)
        },
        deleteTaskFromCard(id) {
            this.$parent.$parent.$parent.deleteTaskApp(id)
        },

    },

    created() {
        // console.log(this.task)
    },

    beforeUpdate() {
        // console.log(this.dataTask, '-- KC')
        // console.log(this.task)
    },
    

}
</script>

<style>

</style>