<template>
  <div class="min-h-full">
    <NkdEpicTasks
      v-for="(epicTasks, i) in epicTasksArray"
      :key="'epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
    />
    <NkdEpicTasksInput @onInputBlur="createEpic" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'
import NkdEpicTasksInput from '@/components/v1/organisms/NkdEpicTasksInput/NkdEpicTasksInput.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

export default defineComponent({
  props: {
    epicTasksArray: {
      type: Array as PropType<EpicTasks[]>,
      required: true,
    },
  },
  components: {
    NkdEpicTasksInput,
    NkdEpicTasks,
  },
  setup(props, context) {
    const taskPageStore = inject(TaskPageStoreKey)
    const epicTasksStore = inject(EpicTasksStoreKey)

    const createEpic = (inputValue: string) => {
      taskPageStore.stopCreateEpic()
      if (inputValue) {
        context.root.$axios
          .post('/api/v1/epics', { title: inputValue })
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
      createEpic,
    }
  },
})
</script>
