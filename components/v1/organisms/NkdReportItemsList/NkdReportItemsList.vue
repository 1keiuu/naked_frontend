<template>
  <div class="mt-10">
    <NkdReportItem
      v-for="report in reports"
      :key="'report' + report.id"
      :report="report"
      @onInputBlur="dispatchEvent"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdReportItem from '@/components/v1/molecules/NkdReportItem/NkdReportItem.vue'

export default defineComponent({
  components: {
    NkdReportItem,
  },
  props: {
    reports: {
      type: Array as PropType<Report[]>,
    },
  },
  setup(_props, context) {
    const onCreateReportBtnClick = () => {
      context.emit('onCreateReportBtnClick')
    }
    const dispatchEvent = (obj: Report) => {
      context.emit('onReportInputBlur', obj)
    }
    return {
      onCreateReportBtnClick,
      dispatchEvent,
    }
  },
})
</script>
<style scoped></style>
