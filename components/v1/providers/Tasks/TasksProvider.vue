<template>
  <div class="tasks__provider w-full h-full">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import TaskStore from '~/store/Task/Task'
import TaskPageStore from '~/store/Task/TaskPage'
import EpicTasksStore from '~/store/EpicTasks/EpicTasks'
import TaskPageStoreKey from '../../storeKeys/TaskPageStoreKey'
import TaskStoreKey from '../../storeKeys/TaskStoreKey'
import EpicTasksStoreKey from '../../storeKeys/EpicTasksStoreKey'

export default defineComponent({
  setup(_props, context) {
    provide(TaskStoreKey, TaskStore())
    provide(TaskPageStoreKey, TaskPageStore())
    provide(EpicTasksStoreKey, EpicTasksStore())

    return {}
  },
})
</script>
