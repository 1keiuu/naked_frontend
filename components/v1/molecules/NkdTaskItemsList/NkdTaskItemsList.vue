<template>
  <div class="mb-1">
    <div class="flex justify-between w-full mb-2">
      <h2>タスク一覧</h2>
      <button @click="onCreateTaskBtnClick" class="">タスクを追加</button>
    </div>
    <div class="task-item__list overflow-y-scroll">
      <NkdTaskItem
        v-for="task in tasks"
        :key="'task' + epic.id + '-' + task.id"
        :task="task"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdTaskItem from '@/components/v1/molecules/NkdTaskItem/NkdTaskItem.vue'

export default defineComponent({
  props: {
    epic: Object as PropType<Epic>,
    tasks: {
      type: Array as PropType<Task[]>,
    },
  },
  setup(_props, context) {
    const onCreateTaskBtnClick = () => {
      context.emit('onCreateTaskBtnClick')
    }
    return {
      onCreateTaskBtnClick,
    }
  },
})
</script>
<style scoped>
.task-item__list {
  max-height: 45vh;
}
</style>
