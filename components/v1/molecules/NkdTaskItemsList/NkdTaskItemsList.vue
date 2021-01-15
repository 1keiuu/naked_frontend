<template>
  <div class="mb-1">
    <NkdTaskItem
      v-for="task in tasks"
      :key="'task' + task.id + type"
      :task="task"
      @onInputBlur="dispatchEvent"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdTaskItem from '@/components/v1/molecules/NkdTaskItem/NkdTaskItem.vue'

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
    },
    type: { type: String },
  },
  setup(_props, context) {
    const onCreateTaskBtnClick = () => {
      context.emit('onCreateTaskBtnClick')
    }
    const dispatchEvent = (obj: Task) => {
      context.emit('onTaskInputBlur', obj)
    }
    return {
      onCreateTaskBtnClick,
      dispatchEvent,
    }
  },
})
</script>
<style scoped></style>
