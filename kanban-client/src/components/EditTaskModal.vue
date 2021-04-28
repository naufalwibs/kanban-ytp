<template>
  <div class="container">
            <div class="overlay" id="edit-task">
                        <div class="modal-dialog" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">Edit Task</h5>
                              <button @click.prevent="closeEditTaskModal" type="button" class="close" data-dismiss="modal">
                                <span>&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <form>
                                <div class="form-group">
                                  <label for="message-text" class="col-form-label">Task:</label>
                                  <textarea class="form-control" id="message-text-edit" v-model="title"> </textarea>
                                </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                              <button @click.prevent="closeEditTaskModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button @click.prevent="editTaskModal" type="button" class="btn btn-primary">Edit Task</button>
                            </div>
                          </div>
                        </div>
                </div>
            </div>
</template>

<script>
export default {
    name: 'EditTaskModal',
    props: ['currentDataForPopuplate'],
    data() {
      return {
        title: this.currentDataForPopuplate[0].title,
      }
    },
    methods: {
      closeEditTaskModal() {
        this.$emit('emitCloseEditTask', false);
        this.title = '';
      },
      editTaskModal() {
        this.$emit('emitEditDataTask', { title: this.title, status: false });
        this.title = '';
      }
    }

}
</script>

<style>

</style>