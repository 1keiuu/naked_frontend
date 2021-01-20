<template>
  <div class="min-h-full">
    <NkdEpicTasks
      v-for="(data, i) in tasksArray"
      :key="'tomorrow-epic-accordion' + i"
      :task="data"
    />
    <NkdEpicTasksInput @onInputBlur="dispatchEvent" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTaskItem from '@/components/v1/molecules/NkdTaskItem/NkdTaskItem.vue'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'
import NkdEpicTasksInput from '@/components/v1/organisms/NkdEpicTasksInput/NkdEpicTasksInput.vue'
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
    NkdEpicTasksInput,
    NkdTaskItem,
    NkdEpicTasks,
  },
  setup(props, context) {
    const dispatchEvent = (inputValue: string) => {
      context.emit('onInputBlur', inputValue)
    }
    return { dispatchEvent }
  },
})
</script>
