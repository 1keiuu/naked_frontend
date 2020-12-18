<template>
  <nav>
    <NkdHeaderItem
      v-for="(item, i) in items"
      :key="'header-item' + i"
      :item="item"
      @onHeaderItemClick="dispatchAction"
    />
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdHeaderItem from '@/components/v1/molecules/NkdHeaderItem/NkdHeaderItem.vue'
export default defineComponent({
  components: {
    NkdHeaderItem,
  },
  props: {
    items: {
      type: Array as PropType<HeaderItem[]>,
    },
  },
  setup(props, context) {
    const dispatchAction = (type: string) => {
      context.emit('dispatchAction', type)
    }
    return {
      dispatchAction,
    }
  },
})
</script>
