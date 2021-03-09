<template>
  <div v-if="taskPageStore.isCreatingTask">
    <input
      class="text-lg tasks-input"
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
<style scoped lang="scss">
.tasks-input {
  height: 60px;
  width: 95%;
  outline: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  padding: 8px 12px;
}

.tasks-input:focus {
  border: 1px solid#b5d9f0;
}
</style>
