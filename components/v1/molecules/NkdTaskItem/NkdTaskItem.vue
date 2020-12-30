<template>
  <div class="py-2 pl-2 mb-2 bg-white">
    <p>{{ task.title }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
    },
  },
  setup(props, context) {},
})
</script>
