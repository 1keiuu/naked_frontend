<template>
  <div id="epic-tasks__card" class="epic-tasks__card" @click="onCardClick">
    <div class="epic-tasks__inner">
      <h3 class="text-lg">{{ task.title }}</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
    },
    subTasks: {
      type: Array as PropType<SubTask[]>,
    },
  },
  setup(props, context) {
    const taskPageStore = inject(TaskPageStoreKey)

    const onCardClick = () => {
      const isDrawerOpen = taskPageStore.isDrawerOpen
      if (isDrawerOpen) {
        taskPageStore.closeDrawer()
        return
      }
      taskPageStore.selectTask(props.task)
      taskPageStore.openDrawer()
    }

    return { onCardClick }
  },
})
</script>
