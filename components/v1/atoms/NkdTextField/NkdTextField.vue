<template>
  <input
    @input="emit"
    :placeholder="placeholder"
    :type="type"
    class="p-2 mb-5 rounded-sm border-2 border-opacity-30 border-gray-500 placeholder-opacity-50"
  />
</template>
<script lang="ts">
import { computed } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
    },
    placeholder: {
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
