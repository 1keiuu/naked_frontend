<template>
  <div class="epic-tasks__input" v-if="taskPageStore.isCreatingEpic">
    <input class="text-lg" @blur="onBlur" ref="inputRef" type="text" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  onMounted,
  watch,
} from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

export default defineComponent({
  props: {},
  setup(props, context) {
    const inputRef = ref<HTMLInputElement>()

    const taskPageStore = inject(TaskPageStoreKey)
    const epicTasksStore = inject(EpicTasksStoreKey)

    watch(
      () => taskPageStore.isCreatingEpic,
      (newVal, oldVal) => {
        setTimeout(() => {
          if (inputRef.value) {
            inputRef.value.focus()
          }
        }, 100)
      }
    )

    const onBlur = () => {
      const inputValue = inputRef.value?.value
      taskPageStore.stopCreateEpic()
      if (inputValue)
        epicTasksStore.appendEpicTasks({ epic: { title: inputValue } })
    }

    return { inputRef, taskPageStore, onBlur }
  },
})
</script>
