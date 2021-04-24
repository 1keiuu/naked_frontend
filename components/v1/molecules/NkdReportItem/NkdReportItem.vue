<template>
  <div class="report-card">
    <div class="report-card__img">
      <img
        src="~/assets/images/avatar.jpg"
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
      />
    </div>
    <div class="report-card__inner">
      <div class="report-card__inner__name">{{report.user.name}}</div>
      <div class="report-card__inner__item">今日のタスク</div>
      <NkdReportTasksList :tasks="report.tasks"/>
      <div class="report-card__inner__item mt-5">
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

export default defineComponent({
  components: {},
  props: {
    report: {
      type: Object,
    },
  },
  setup(props, context) {
    console.log(props.report)
    return {}
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
    &__description {
      font-weight: 350;
      padding: 8px 12px;
    }
  }
}
</style>
