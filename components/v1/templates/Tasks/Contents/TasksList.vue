<template>
  <div class="min-h-full">
    <NkdTaskItemsList :tasks="tasksArray" />
    <NkdEpicTasksInput @onInputBlur="dispatchEvent" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/organisms/NkdTaskItemsList/NkdTaskItemsList.vue'
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
