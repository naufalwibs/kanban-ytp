<template>
  <div class="container-fluid" id="kanban-page">
    <div class="bigger-heading">
        <h1 class="text-center"> Kanban Board </h1>
        <h3 class="text-center"> - Hello, {{ user }} - </h3>
    </div>

    <div class="container-fluid d-flex justify-content-center">
        <a @click="openAddTaskForm" href="#" class="btn btn-primary btn-add-margin"> <i class="fas fa-plus-circle"></i> Add Task </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleHomaPageAddButton',
  props: ['openAddTaskForm'],
  // methods: {
  //   closeAddTaskFromATM(status) {
  //     console.log(status)
  //     this.$emit('emitCloseAddTaskBtnAdd', status)
  //   } 
  // }, @emitCloseAddTask="closeAddTaskFromATM"
  data() {
    return {
      user: localStorage.email.split('@')[0]
    }
  }

}
</script>

<style>

</style>