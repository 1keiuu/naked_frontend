<template>
  <div class="task-page w-full h-full">
    <TasksPage>
      <TasksIndex
        :today="tasksStore.todayTasks"
        :tomorrow="tasksStore.tomorrowTasks"
        :noDate="tasksStore.noDateTasks"
        :current="tasksStore.currentTask"
        @onInputBlur="createTask"
        @updateTaskDate="updateTask"
      />
    </TasksPage>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, inject } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import TasksIndex from '@/components/v1/templates/Tasks/Contents/TasksIndex.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const tasksStore = inject(TasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)
    tasksStore.setCurrentTask(null)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        tasksStore.setTodayTasks(res.data.today)
        tasksStore.setTomorrowTasks(res.data.tomorrow)
        tasksStore.setNoDateTasks(res.data.no_date)
        tasksStore.setCurrentTask(res.data.current)
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
            color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
          })
          .then((res) => {
            const task = res.data.task
            tasksStore.appendToNoDateTask(task)
          })
          .catch((e) => {})
      }
    }

    const updateTask = (inputValue: Task) => {
      if (inputValue) {
        const data = inputValue
        data.user_id = context.root.$auth.user.id
        context.root.$axios
          .patch(`/api/v1/tasks/${inputValue.id}`, data)
          .then((res) => {
            tasksStore.updateTask(res.data.task)
          })
          .catch((e) => {})
      }
    }
    return {
      tasksStore,
      createTask,
      updateTask,
    }
  },
})
</script>
