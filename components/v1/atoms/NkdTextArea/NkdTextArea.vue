<template>
  <textarea
    @input="emit"
    :placeholder="placeholder"
    :value="value"
    :type="type"
    :class="{ '--outlined': isOutLined }"
    class="nkd__text-area resize-none w-full mb-5 rounded-sm border-2 border-opacity-30 border-gray-500 placeholder-opacity-50"
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
  },
  setup(props, context) {
    const emit = (e: KeyboardEvent) => {
      context.emit('input', props.type, (e.target as HTMLInputElement).value)
    }

    return { emit }
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
  }
}
</style>
