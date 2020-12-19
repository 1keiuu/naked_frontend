<template>
  <div class="task__sub-header w-full h-12 bg-white fixed">
    <button @click="onTabClick(id)" v-for="tab in tabs" :key="'tab' + tab.id">
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
    const onTabClick = (id: number) => {
      context.emit('onTabClick', id)
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
