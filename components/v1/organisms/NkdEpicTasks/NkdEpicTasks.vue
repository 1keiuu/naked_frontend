<template>
  <div class="epic-tasks__card" @click="onCardClick">
    <h3 class="text-xl">{{ epic.title }}</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {
    epic: {
      type: Object as PropType<Epic>,
    },
    tasks: {
      type: Array as PropType<Task[]>,
    },
  },
  setup(props, context) {
    const taskPageStore = inject(TaskPageStoreKey)

    const onCardClick = () => {
      const isDrawerOpen = taskPageStore.isDrawerOpen
      if (isDrawerOpen) {
        taskPageStore.setIsDrawerOpen(false)
        return
      }
      taskPageStore.setEpic(props.epic)
      taskPageStore.setTasks(props.tasks)
      taskPageStore.setIsDrawerOpen(true)
    }

    return { onCardClick }
  },
})
</script>
