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
import ReportPageStore from '~/store/Reports/ReportPage'
import ReportPageStoreKey from '../../storeKeys/ReportPageStoreKey'
import ReportStore from '~/store/Reports/Reports'
import ReportsStoreKey from '../../storeKeys/ReportsStoreKey'
import RecordStore from '~/store/Records/Records'
import RecordsStoreKey from '../../storeKeys/RecordsStoreKey'
import UserStore from '~/store/Users/Users'
import UsersStoreKey from '../../storeKeys/UsersStoreKey'

export default defineComponent({
  setup(_props, context) {
    provide(TasksStoreKey, TaskStore())
    provide(TaskPageStoreKey, TaskPageStore())
    provide(EpicTasksStoreKey, EpicTasksStore())
    provide(ReportPageStoreKey, ReportPageStore())
    provide(ReportsStoreKey, ReportStore())
    provide(RecordsStoreKey, RecordStore())
    provide(UsersStoreKey, UserStore())
    return {}
  },
})
</script>
