<template>
  <div class="task-page w-full h-full">
    <TasksProvider>
      <TasksPage :epicTasksArray="epicTasksArray" />
    </TasksProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import TasksProvider from '@/components/v1/providers/Tasks/TasksProvider.vue'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'

export default defineComponent({
  components: { TasksProvider, TasksPage },
  setup(_props, context) {
    const epicTasksArray = reactive<EpicTasks[]>([])
    context.root.$axios
      .get('/api/v1/epics/epic_tasks')
      .then((res) => {
        res.data.epic_tasks.forEach((epicTasks: EpicTasks) => {
          epicTasksArray.push(epicTasks)
        })
      })
      .catch((e) => {
        console.log(e)
      })
    return { epicTasksArray }
  },
})
</script>
