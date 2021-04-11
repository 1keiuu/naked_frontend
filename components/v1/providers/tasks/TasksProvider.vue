<template>
  <div class="tasks__provider w-full h-full">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import TaskStore from '~/store/Tasks/Tasks'
import TaskPageStore from '~/store/Tasks/TaskPage'
import EpicTasksStore from '~/store/EpicTasks/EpicTasks'
import TaskPageStoreKey from '../../storeKeys/TaskPageStoreKey'
import TasksStoreKey from '../../storeKeys/TasksStoreKey'
import EpicTasksStoreKey from '../../storeKeys/EpicTasksStoreKey'
import ReportPageStoreKey from '../../storeKeys/ReportPageStoreKey'

export default defineComponent({
  setup(_props, context) {
    provide(TasksStoreKey, TaskStore())
    provide(TaskPageStoreKey, TaskPageStore())
    provide(EpicTasksStoreKey, EpicTasksStore())
    // provide(ReportPageStoreKey, ReportPageStore())

    return {}
  },
})
</script>
