<template>
  <div class="task-page w-full h-full">
    <TasksProvider>
      <TasksPage :today="today" :tomorrow="tomorrow" />
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
    const today = reactive<EpicTasks[]>([])
    const tomorrow = reactive<EpicTasks[]>([])

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        today.values = res.data.today
        tomorrow.values = res.data.tomorrow
      })
      .catch((e) => {
        console.log(e)
      })

    return { today, tomorrow }
  },
})
</script>
