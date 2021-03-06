<template>
  <div v-if="reportPageStore.isCreatingReport">
    <div class="report-header" @click="clickCloseClick">
      <NkdIcon type="close" color="black" class="report-header__close"/>
    </div>
    <div v-if="tasksStore.todayTasks.length <= 0" class="report-body">
      今日のタスクを作成してください
    </div>
    <div v-else>
      <div class="report-body">
        <div>
          今日やったこと
        </div>
        <NkdReportTasksList :tasks="tasksStore.todayTasks"/>
        <div class=report-body__text>
          <NkdLabel name="report-description" value="コメント" class="mt-10" />
          <NkdTextArea
            @onTextAreaBlur="setReport"
            :isOutLined="true"
            name="report-description"
          />
        </div>
      </div>
      <div class="report-bottom">
        <button class="report-bottom__button" @click="onCreateReportBtnClick">
          <p>日報を送信する</p>
        </button>
      </div>
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
    const reportDescription = ref()

    const setReport = (inputValue: string) => {
      reportDescription.value = inputValue
    }

    const onCreateReportBtnClick = () => {
      reportPageStore?.stopCreateReport()

      context.root.$axios
        .post('/api/v1/reports', {
          description: reportDescription.value,
          user_id: context.root.$auth.user.id,
          task_ids: tasksStore.todayTasks.map((task: any) => task.id),
        })
        .then((res) => {
          const report = res.data.report
          reportsStore.appendToReports(report)
        })
        .catch((e) => {})
    }

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        tasksStore.setTodayTasks(res.data.today.slice(0, 4))
      })
      .catch((e) => {
        console.error(e)
      })

    const clickCloseClick = () => {
      reportPageStore?.stopCreateReport()
    }

    return {
      reportPageStore,
      clickCloseClick,
      tasksStore,
      setReport,
      onCreateReportBtnClick,
    }
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
  &__text {
    margin-top: 20px;
  }
}

.report-bottom {
  position: absolute;
  left: 15px;
  top: 530px;
  &__button {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #50bfff;
    height: 50px;
    width: 540px;
    padding: 0px 12px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    border: 1px solid #a4cef9;
  }
}
</style>
