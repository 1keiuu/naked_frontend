<template>
  <div>
    <NkdEpicTasks
      v-for="(epicTasks, i) in epicTasksArray"
      :key="'epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
      @onCardClick="onCardClick"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
export default defineComponent({
  props: {
    epicTasksArray: {
      type: Array as PropType<EpicTasks[]>,
      required: true,
    },
  },
  setup() {
    const taskPageStore = inject(TaskPageStoreKey)
    const onCardClick = (epic: Epic, tasks: Task[]) => {
      taskPageStore.setEpic(epic)
      taskPageStore.setTasks(tasks)
      console.log(taskPageStore)
    }

    return {
      onCardClick,
    }
  },
})
</script>
