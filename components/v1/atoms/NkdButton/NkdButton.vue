<template>
  <button
    :type="type"
    class="p-2 mb-5 rounded-sm border-2 border-opacity-30 border-blue-500 bg-blue-500 text-white"
  >
    {{ title }}
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    type: {
      type: String,
    },
  },
})
</script>
