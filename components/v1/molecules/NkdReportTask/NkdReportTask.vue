<template>
  <div>
    <div id="task-card" class="task-card">
      <div class="task-card__inner">
        <h3 class="text-lg" id="task-card">{{ task.title }}</h3>
      </div>
      <div v-if="task.starts_date == task.due_date" class="date__wrapper">
        <p class="starts-date" id="task-card">{{ task.starts_date }}</p>
      </div>
      <p class="ml-2 task-card__time" id="task-card">{{record_time}}</p>
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
    task: {
      type: Object,
    },
  },
  setup(props, context) {
    const record_time = ref(Number)

    context.root.$axios
      .post('/api/v1/records/time', {
        task_id: props.task?.id,
      })
      .then((res) => {
        record_time.value = res.data.record_time
      })
      .catch((e) => {})

    return {
      record_time,
    }
  },
})
</script>
<style scoped lang="scss">
</style>
