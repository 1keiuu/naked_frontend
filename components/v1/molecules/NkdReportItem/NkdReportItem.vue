<template>
  <div class="report-card">
    <div class="report-card__inner">
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
  &__inner {
    padding: 24px;
    &__item {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 6px;
    }
    &__description {
      font-weight: 350;
      padding: 8px 12px;
    }
  }
}
</style>
