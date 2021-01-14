<template>
  <div class="task-page w-full h-full">
    <TasksPage>
      <TasksIndex
        :today="tasksStore.todayTasks"
        :tomorrow="tasksStore.tomorrowTasks"
        :noDate="tasksStore.noDateTasks"
        @onInputBlur="createTask"
      />
    </TasksPage>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import TasksIndex from '@/components/v1/templates/Tasks/Contents/TasksIndex.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey.ts'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const tasksStore = inject(TasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        console.log(res)
        tasksStore.setTodayTasks(res.data.today)
        tasksStore.setTomorrowTasks(res.data.tomorrow)
        tasksStore.setNoDateTasks(res.data.no_date)
      })
      .catch((e) => {
        console.error(e)
      })

    const createTask = (inputValue: string) => {
      taskPageStore.stopCreateTask()
      if (inputValue) {
        context.root.$axios
          .post('/api/v1/tasks', {
            title: inputValue,
            user_id: context.root.$auth.user.id,
          })
          .then((res) => {
            const task = res.data.task
            tasksStore.appendTasks({
              task: { id: task.id, title: task.title },
            })
          })
          .catch((e) => {})
      }
    }
    return {
      tasksStore,
      createTask,
    }
  },
})
</script>
