<template>
  <div>
    <!-- idのtask-cardを変えるときは注意 -->
    <div class="task-card">
      <div class="task-card__inner">
        <div class="task-card__color mr-5" :style="style"/>
        <h3 class="text-lg" id="task-card">{{ task.title }}</h3>
      </div>
      <p class="mr-11 task-card__time" id="task-card">{{record_time}}</p>
      <p class="mr-11 task-card__time-rational" id="task-card">{{task.time_rational}}%</p>
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
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    task: {
      type: Object,
    },
    graphType: String,
  },
  setup(props, context) {
    const record_time: Ref<string> = ref('')
    const style = computed(() => {
      return { '--task-color': props.task?.color }
    })
    if (props.graphType == 'today')
      context.root.$axios
        .post('/api/v1/records/today_time', {
          task_id: props.task?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    else if (props.graphType == 'week')
      context.root.$axios
        .post('/api/v1/records/week_time', {
          task_id: props.task?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    else if (props.graphType == 'month')
      context.root.$axios
        .post('/api/v1/records/month_time', {
          task_id: props.task?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    return { record_time, style }
  },
})
</script>
<style scoped lang="scss">
.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 8px 12px;
  border-bottom: 1px solid #efefef;
  &__inner {
    display: flex;
    align-items: center;
    flex: 1;
  }
  &__color {
    width: 20px;
    height: 20px;
    background-color: var(--task-color);
  }
  &__time {
    color: gray;
    font-size: 13px;
    flex: 2;
  }
  &__time-rational {
    color: gray;
    font-size: 15px;
    flex: 3;
  }
}
</style>
