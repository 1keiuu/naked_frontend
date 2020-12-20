<template>
  <div class="task-page w-full h-full">
    <TasksProvider>
      <TasksPage :epics="epics" />
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
    const epics = reactive<EpicTasks[]>([])
    context.root.$axios
      .get('/api/v1/tasks/no_date_tasks')
      .then((res) => {
        epics.values = res.data.epics
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e)
      })

    return { epics }
  },
})
</script>
