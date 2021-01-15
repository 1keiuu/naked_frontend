<template>
  <div class="epic-tasks__input" v-if="taskPageStore.isCreatingTask">
    <input
      class="text-lg"
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
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {},
  setup(props, context) {
    const inputRef = ref<HTMLInputElement>()

    const taskPageStore = inject(TaskPageStoreKey)

    watch(
      () => taskPageStore.isCreatingTask,
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
