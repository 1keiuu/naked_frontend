<template>
  <div
    class="drawer-tasks__input w-full"
    v-if="taskPageStore.isCreatingSubTask"
  >
    <input
      class="text-lg w-full pl-2 py-2"
      @blur="onBlur"
      @keydown="onKeyDown"
      ref="inputRef"
      type="text"
    />
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
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {},
  setup(props, context) {
    const inputRef = ref<HTMLInputElement>()

    const taskPageStore = inject(TaskPageStoreKey)

    watch(
      () => taskPageStore.isCreatingSubTask,
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
      context.emit('onInputBlur', inputValue)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const inputValue = inputRef.value?.value
      if (e.keyCode == 13) {
        inputRef.value?.blur()
      }
    }

    return { inputRef, taskPageStore, onBlur, onKeyDown }
  },
})
</script>
