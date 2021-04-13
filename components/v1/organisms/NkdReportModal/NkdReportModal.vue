<template>
  <div v-if="reportPageStore.isCreatingReport">
    <div class="report-header" @click="clickCloseClick">
      <NkdIcon type="close" color="black" class="report-header__close"/>
    </div>
    <div class="report-body">
      <div>
        今日やったこと
      </div>
      <ul style="list-style: circle;">
        <NkdRecordItemsList :tasks="tasksStore.todayTasks"/>
      </ul>
    </div>

  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  onMounted,
  watch,
} from '@vue/composition-api'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'
import ReportsStoreKey from '@/components/v1/storeKeys/ReportsStoreKey'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import NkdReportTasksList from '@/components/v1/organisms/NkdReportTasksList/NkdReportTasksList.vue'

export default defineComponent({
  components: {
    NkdReportTasksList,
  },
  props: {},
  setup(props, context) {
    const reportPageStore = inject(ReportPageStoreKey)
    const reportsStore = inject(ReportsStoreKey)
    const tasksStore = inject(TasksStoreKey)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        tasksStore.setTodayTasks(res.data.today)
      })
      .catch((e) => {
        console.error(e)
      })

    const clickCloseClick = () => {
      reportPageStore?.stopCreateReport()
    }

    return { reportPageStore, clickCloseClick, tasksStore }
  },
})
</script>
<style scoped lang="scss">
.report-header {
  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 16px;
    cursor: pointer;
  }
}

.report-body {
  position: absolute;
  left: 15px;
  top: 50px;
}
</style>
