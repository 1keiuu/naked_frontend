<template>
  <div class="min-h-full tasks-group">
    <div class="tasks-group ml-5 mt-3">
      <h2 class="text-xl mb-3">タスク一覧</h2>
      <NkdTaskItemsList :tasks="tasksArray" :type="'list'"/>
      <NkdTasksInput @onInputBlur="dispatchEvent" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/organisms/NkdTaskItemsList/NkdTaskItemsList.vue'
import NkdTasksInput from '@/components/v1/organisms/NkdTasksInput/NkdTasksInput.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

export default defineComponent({
  props: {
    tasksArray: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
  components: {
    NkdTasksInput,
    NkdTaskItemsList,
  },
  setup(props, context) {
    const dispatchEvent = (inputValue: string) => {
      context.emit('onInputBlur', inputValue)
    }
    return { dispatchEvent }
  },
})
</script>
<style scoped lang="scss">
.tasks-group::after {
  content: '';
  height: 80px;
  display: block;
}
</style>
