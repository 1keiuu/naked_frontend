<template>
  <button @click="onItemClick">
    <span>
      <p>{{ item.title }}</p>
    </span>
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
