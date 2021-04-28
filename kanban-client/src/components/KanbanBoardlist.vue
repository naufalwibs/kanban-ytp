<template>
    <div class="col-lg-3" :dataTask="dataTask">
                <div class="card padding-category">
                    <h5 class="text-center kanban-header"> {{ catName }}  </h5>
                </div>
                <div class="scrollable">
                    <KanbanCard 
                    :data="dataTask" 
                    >
                    </KanbanCard>
                </div>
        </div>
</template>


<script>
import KanbanCard from './KanbanCard';

export default {
    props: ['catName', 'dataTask'],
    name: 'KanbanBoardList',
    methods: {
    },
    components: {
        KanbanCard
    },

    created() {
        // console.log(this.taskCatBL)
        // console.log(this.dataTask)
        // console.log(this.catName)
    },

    beforeUpdate() {
        // console.log(this.dataTask, 'KBL');
        // this.loadTask()
        // console.log(this.categoryAvailable)
    },



}
</script>

<style>

</style>