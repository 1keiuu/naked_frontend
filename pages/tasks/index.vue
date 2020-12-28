<template>
  <div class="task-page w-full h-full">
    <TasksPage />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const epicTasksStore = inject(EpicTasksStoreKey)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        epicTasksStore.setTodayEpicTasks(res.data.today)
        epicTasksStore.setTomorrowEpicTasks(res.data.tomorrow)
        epicTasksStore.setNoDateEpicTasks(res.data.no_date)
      })
      .catch((e) => {
        console.error(e)
      })
  },
})
</script>
