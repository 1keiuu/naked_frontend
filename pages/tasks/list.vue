<template>
  <div class="task-page w-full h-full">
    <TasksPage>
      <TasksList :tasksArray="tasksStore.tasks" @onInputBlur="createTask" />
    </TasksPage>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import TasksList from '@/components/v1/templates/Tasks/Contents/TasksList.vue'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const tasksStore = inject(TasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)

    context.root.$axios
      .get('/api/v1/sub_tasks')
      .then((res) => {
        tasksStore.setTasks(res.data)
      })
      .catch((e) => {
        console.error(e)
      })

    const createTask = (inputValue: string) => {
      taskPageStore.stopCreateTask()
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let color = `rgb(${r},${g},${b})`
      if (inputValue) {
        context.root.$axios
          .post('/api/v1/tasks', {
            title: inputValue,
            user_id: context.root.$auth.user.id,
            color: color,
          })
          .then((res) => {
            const task = res.data.task
            tasksStore.appendTask({
              id: task.id,
              title: task.title,
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
