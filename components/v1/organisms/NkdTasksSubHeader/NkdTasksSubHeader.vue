<template>
  <div class="task__sub-header w-full h-12 bg-white fixed flex items-center">
    <button
      v-for="tab in tabs"
      :key="'tab' + tab.id"
      @click="onTabClick(tab.id, tab.route)"
      class="ml-4 h-full"
    >
      <p>{{ tab.title }}</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    tabs: {
      type: Array,
    },
  },
  setup(props, context) {
    const onTabClick = (id: number, route: string) => {
      context.emit('onTabClick', id, route)
    }
    return { onTabClick }
  },
})
</script>
<style scoped lang="scss">
.task__sub-header {
  top: 4em;
}
</style>
