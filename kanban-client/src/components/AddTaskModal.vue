<template>
  <div class="container">
        <div class="overlay" id="add-task">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">New Task</h5>
                          <button v-on:click.prevent="closeAddTask" type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <form v-on:submit.prevent="">
                            <div class="form-group">
                                <label for="category-add" class="col-form-label">Category :</label>
                                <select v-model="category" id="category-add" class="form-control" aria-label="Default select example">
                                  <option selected disabled>-- Select Category --</option>
                                  <option value="backlog">Backlog</option>
                                  <option value="todo">Todo</option>
                                  <option value="doing">Doing</option>
                                  <option value="done">Done</option>
                                </select>
                              </div>
                            <div class="form-group">
                              <label for="message-text-add" class="col-form-label">Task:</label>
                              <textarea class="form-control" id="message-text-add" v-model="title"></textarea>
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button v-on:click.prevent="closeAddTask" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button v-on:click.prevent="addTaskFromModal" type="button" class="btn btn-primary">Add Task</button>
                        </div>
                      </div>
                    </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddTaskModal',
    props: ['closeAddPage'],
    data() {
        return {
            title: '',
            category: '',
        }
    },
    methods: {
        closeAddTask() {
            this.$emit('emitCloseAddTask', { status: false })
            this.title = '';
            this.category = '';
        },
        addTaskFromModal() {
            this.$emit('emitAddTaskModal', { title : this.title, category : this.category , status: false});

        }
    }

}
</script>

<style>

</style>