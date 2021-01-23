<template>
    <div class="sub-task__list">
      <NkdSubTaskItem
        v-for="subTask in subTasks"
        :key="'subTask' + subTask.id"
        :subTask="subTask"
        @onInputBlur="dispatchEvent"
      />
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
