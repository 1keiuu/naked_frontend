<template>
  <div class="report-card">
    <div class="report-card__img">
      <img
        :src="avatarUrl"
        v-if="avatarUrl"
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
      />
      <img
        src="~/assets/images/avatar.jpg"
        v-else
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
      />
    </div>
    <div class="report-card__inner">
      <div v-if="report.user_id == userId" class="report-card__inner__trash" @click="onClickReportDelete">
        <NkdIcon type="trash" color="rgb(149 150 152)"/>
      </div>
      <div class="report-card__inner__name">{{userName}}</div>
      <div class="report-card__inner__item">今日のタスク</div>
      <NkdReportTasksList :tasks="reportTasks"/>
      <div class="report-card__inner__item-description mt-5">
        コメント
      </div>
      <div class="report-card__inner__description">
        {{report.description}}
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
  watch,
  computed,
} from '@vue/composition-api'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'

export default defineComponent({
  components: { NkdIcon },
  props: {
    report: {
      type: Object,
    },
  },
  setup(props, context) {
    const tasksStore = inject(TasksStoreKey)
    const reportTasks =
      props?.report?.tasks == null
        ? ref(tasksStore.todayTasks)
        : ref(props?.report?.tasks)

    const avatarUrl =
      props?.report?.user == null
        ? ref(context.root.$auth.user.avatar_url)
        : ref(props?.report?.user.avatar_url)

    const userName =
      props?.report?.user == null
        ? ref(context.root.$auth.user.name)
        : ref(props?.report?.user.name)

    const userId = ref(context.root.$auth.user.id)
    const reportPageStore = inject(ReportPageStoreKey)
    const onClickReportDelete = () => {
      if (window.confirm('削除してもよろしいですか？')) {
        reportPageStore?.selectReport(props?.report)
        context.emit('onClickReportDelete')
      }
    }
    return { userId, onClickReportDelete, userName, reportTasks, avatarUrl }
  },
})
</script>
<style scoped lang="scss">
.report-card {
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  border: 1px solid rgb(220, 228, 243);
  // box-shadow: rgb(0 0 0 / 8%) 0px 1px 3px 0px;
  position: relative;
  width: 90%;
  margin: 5px auto 24px;
  display: flex;
  &__img {
    padding-top: 24px;
    padding-left: 24px;
  }
  &__inner {
    padding-top: 24px;
    padding-left: 4px;
    &__trash {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 36px;
      height: 36px;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      background: rgb(243, 250, 255);
      display: flex;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
    &__name {
      // color: gray;
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 3px;
    }
    &__item {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 6px;
      color: #232323;
    }
    &__item-description {
      font-weight: 600;
      font-size: 16px;
      color: #232323;
    }
    &__description {
      font-weight: 350;
      padding: 0px 12px;
      padding-bottom: 8px;
      white-space: pre-line;
    }
  }
}
</style>
