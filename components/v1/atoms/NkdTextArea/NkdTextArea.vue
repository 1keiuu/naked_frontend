<template>
  <textarea
    @input="onInput"
    @blur="onBlur"
    :placeholder="placeholder"
    :value="value"
    :type="type"
    :name="name"
    :class="{ '--outlined': isOutLined }"
    class="nkd__text-area resize-none w-full mt-2 mb-5 pb-16 rounded-sm border-2 border-opacity-30 border-gray-500 placeholder-opacity-50"
  />
</template>
<script lang="ts">
import { computed } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    isOutLined: {
      type: Boolean,
      required: false,
    },
    value: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const onInput = (e: KeyboardEvent) => {
      context.emit(
        'onTextAreaInput',
        props.type,
        (e.target as HTMLInputElement).value
      )
    }
    const onBlur = (e: Event) => {
      context.emit('onTextAreaBlur', (e.target as HTMLInputElement).value)
    }
    return { onInput, onBlur }
  },
})
</script>
<style scoped lang="scss">
.nkd__text-area {
  &.--outlined {
    outline: 0;
    background: transparent;
    border: 0;
    border-bottom: 2px solid rgb(195, 195, 195);
    height: 200px;
  }
}
</style>
