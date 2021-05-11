<template>
  <div>
    <div id="report-card" class="report-card">
      <div class="report-card__inner">
        <h3 class="text-lg" id="report-card">{{ task.title }}</h3>
      </div>
      <p class="report-card__time" id="report-card">{{record_time}}</p>
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
  Ref,
} from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    task: {
      type: Object,
    },
    report: {
      type: Object,
    },
  },
  setup(props, context) {
    const record_time: Ref<string> = ref('')

    if (props.report) {
      context.root.$axios
        .post('/api/v1/records/report_time', {
          task_id: props.task?.id,
          report_id: props.report?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    } else {
      context.root.$axios
        .post('/api/v1/records/today_time', {
          task_id: props.task?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    }

    return {
      record_time,
    }
  },
})
</script>
<style scoped lang="scss">
.report-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  width: 550px;
  &__inner {
    font-weight: 350;
    flex: 1;
  }
  &__time {
    color: gray;
    font-size: 13px;
  }
}
</style>
