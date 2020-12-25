<template>
  <div id="epic-tasks__card" class="epic-tasks__card" @click="onCardClick">
    <div class="epic-tasks__inner">
      <h3 class="text-lg">{{ epic.title }}</h3>
    </div>
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
        taskPageStore.closeDrawer()
        return
      }
      taskPageStore.setEpic(props.epic)
      taskPageStore.setTasks(props.tasks)
      taskPageStore.openDrawer()
    }

    return { onCardClick }
  },
})
</script>
