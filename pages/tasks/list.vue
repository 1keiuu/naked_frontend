<template>
  <div class="task-page w-full h-full">
    <TasksPage>
      <TasksList
        :epicTasksArray="epicTasksStore.epicTasks"
        @onInputBlur="createEpic"
      />
    </TasksPage>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from '@vue/composition-api'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey.ts'
import TasksList from '@/components/v1/templates/Tasks/Contents/TasksList.vue'

export default defineComponent({
  components: { TasksPage },
  setup(_props, context) {
    const epicTasksStore = inject(EpicTasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        console.log(res)
        epicTasksStore.setEpicTasks(res.data.epics)
      })
      .catch((e) => {
        console.error(e)
      })
    const createEpic = (inputValue: string) => {
      taskPageStore.stopCreateEpic()
      if (inputValue) {
        context.root.$axios
          .post('/api/v1/epics', {
            title: inputValue,
            user_id: context.root.$auth.user.id,
          })
          .then((res) => {
            const epic = res.data.epic
            epicTasksStore.appendEpicTasks({
              epic: { id: epic.id, title: epic.title },
            })
          })
          .catch((e) => {})
      }
    }
    return {
      epicTasksStore,
      createEpic,
    }
  },
})
</script>
