<template>
  <input
    @input="onInput"
    @blur="onBlur"
    :placeholder="placeholder"
    :value="value"
    :type="type"
    :name="name"
    autocomplete
    :class="{ '--outlined': isOutLined }"
    class="nkd__text-field w-full p-2 mb-5 rounded-sm border-2 border-opacity-30 border-gray-500 placeholder-opacity-50"
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
      context.emit('input', props.type, (e.target as HTMLInputElement).value)
    }
    const onBlur = (e: Event) => {
      context.emit('onTextFieldBlur', (e.target as HTMLInputElement).value)
    }
    return { onInput, onBlur }
  },
})
</script>
<style scoped lang="scss">
.nkd__text-field {
  &.--outlined {
    outline: 0;
    background: transparent;
    border: 0;
    border-bottom: 2px solid rgb(195, 195, 195);
  }
}
</style>
