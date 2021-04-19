<template>
  <div class="report-card">
    <div class="report-card__inner">
      <NkdReportTasksList :tasks="report.tasks"/>
      {{report.description}}
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
  }
}
</style>
