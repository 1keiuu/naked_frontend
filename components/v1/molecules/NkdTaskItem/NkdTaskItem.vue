<template>
  <div class="py-2 pl-2 mb-2 bg-white">
    <input class="input" ref="inputRef" @blur="onBlur" @keydown="onKeyDown" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
    },
  },
  setup(props, context) {
    const inputRef = ref<HTMLInputElement>()
    onMounted(() => {
      if (!inputRef.value || !props.task) return
      inputRef.value.value = props.task?.title
    })
    const onBlur = () => {
      if (!props.task) return
      const inputValue = inputRef.value?.value
      let obj = {
        id: props.task.id,
        title: inputValue,
      }
      context.emit('onInputBlur', obj)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const inputValue = inputRef.value?.value
      if (e.keyCode == 13) {
        inputRef.value?.blur()
      }
    }

    return { inputRef, onBlur, onKeyDown }
  },
})
</script>
<style scoped>
.input {
  padding-left: 4px;
  max-width: 70%;
}
</style>
