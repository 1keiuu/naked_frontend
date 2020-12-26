<template>
  <button
    id="header-item"
    @click="onItemClick"
    class="bg-white hover:bg-gray-200 py-2 px-16"
  >
    <div class="flex pointer-events-none">
      <p class="text-sm">{{ item.title }}</p>
    </div>
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<HeaderItem>,
      required: true,
    },
  },
  setup(props, context) {
    const onItemClick = () => {
      context.emit('onHeaderItemClick', props.item.type)
    }
    return { onItemClick }
  },
})
</script>
