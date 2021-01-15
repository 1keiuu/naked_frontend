<template>
  <div class="mb-1">
    <div class="flex justify-between w-full mb-2">
      <h2>タスク一覧</h2>
      <button @click="onCreateSubTaskBtnClick" class="">タスクを追加</button>
    </div>
    <div class="sub-task__list overflow-y-scroll">
      <NkdSubTaskItem
        v-for="subTask in subTasks"
        :key="'subTask' + subTask.id"
        :subTask="subTask"
        @onInputBlur="dispatchEvent"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdSubTaskItem from '@/components/v1/molecules/NkdSubTaskItem/NkdSubTaskItem.vue'

export default defineComponent({
  props: {
    subTasks: {
      type: Array as PropType<SubTask[]>,
    },
  },
  setup(props, context) {
    const onCreateSubTaskBtnClick = () => {
      context.emit('onCreateSubTaskBtnClick')
    }
    const dispatchEvent = (obj: Task) => {
      context.emit('onSubTaskInputBlur', obj)
    }
    return {
      onCreateSubTaskBtnClick,
      dispatchEvent,
    }
  },
})
</script>
<style scoped>
.sub-task__list {
  max-height: 45vh;
}
</style>
