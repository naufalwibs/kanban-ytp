<template>
  <div class="overlay" id="category-patch">
        <div class="container">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Update Category</h5>
                      <button v-on:click.prevent="closeEditCategoryModal" type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="form-group">
                          <label for="category-name" class="col-form-label">Category :</label>
                          <select v-model="category" class="form-control" aria-label="Default select example">
                            <option selected disabled>-- Select Category --</option>
                            <option value="backlog">Backlog</option>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button v-on:click.prevent="closeEditCategoryModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button v-on:click.prevent="editCategoryModal" type="button" class="btn btn-primary">Edit Task</button>
                    </div>
                  </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditCategoryModal',
    props: ['currentDataForPopuplate'],
    data() {
      return {
        category: this.currentDataForPopuplate[0].category
      }
    },
    methods: {
      closeEditCategoryModal() {
        this.$emit('emitCloseCategoryModal', false)
        this.category = ''
      },
      editCategoryModal() {
        this.$emit('emitEditCategoryModal', { category : this.category, status: false });
        this.category = ''
      }
    }

}
</script>

<style>

</style>