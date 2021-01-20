<template>
  <div class="task-page w-full h-full">
    <TasksPage>
      <TasksList :epicTasksArray="tasksStore.tasks" @onInputBlur="createEpic" />
    </TasksPage>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey.ts'
import TasksList from '@/components/v1/templates/Tasks/Contents/TasksList.vue'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const tasksStore = inject(TasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        console.log(res)
        tasksStore.setTasks(res.data.epics)
      })
      .catch((e) => {
        console.error(e)
      })
    const createEpic = (inputValue: string) => {
      taskPageStore.stopCreateTask()
      if (inputValue) {
        context.root.$axios
          .post('/api/v1/tasks', {
            title: inputValue,
            user_id: context.root.$auth.user.id,
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
      createEpic,
    }
  },
})
</script>
