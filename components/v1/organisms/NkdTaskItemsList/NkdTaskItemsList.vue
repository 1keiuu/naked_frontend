<template>
  <div>
    <NkdTaskItem
      v-for="task in tasks"
      :key="'task' + task.id"
      :task="task"
      :type="type"
      @onInputBlur="dispatchEvent"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdTaskItem from '@/components/v1/molecules/NkdTaskItem/NkdTaskItem.vue'

export default defineComponent({
  components: {
    NkdTaskItem,
  },
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
    },
    type: {
      type: String,
    },
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
