<template>
  <div class="task-page w-full h-full">
    <TasksProvider>
      <TasksPage />
    </TasksProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TasksProvider from '@/components/v1/providers/Tasks/TasksProvider.vue'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'

export default defineComponent({
  components: { TasksProvider, TasksPage },
  setup(_props, context) {
    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  },
})
</script>
