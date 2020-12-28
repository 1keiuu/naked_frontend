<template>
  <div class="task-page w-full h-full">
    <TasksPage />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const epicTasksStore = inject(EpicTasksStoreKey)

    context.root.$axios
      .get('/api/v1/epics/epic_tasks')
      .then((res) => {
        epicTasksStore.setEpicTasks(res.data.epic_tasks)
      })
      .catch((e) => {
        console.error(e)
      })
  },
})
</script>
