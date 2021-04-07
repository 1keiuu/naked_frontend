<template>
  <div
    class="task__sub-header w-full left-0 h-12 pl-56 bg-white fixed flex items-center justify-between"
  >
    <div class="link__group h-full">
      <button
        v-for="tab in tabs"
        :key="'tab' + tab.id"
        @click="onTabClick(tab.id, tab.route)"
        class="ml-4 h-full tab"
        :class="{ '--active': currentPage == tab.route }"
      >
        <p :class="{ '--active': currentPage == tab.route }">{{ tab.title }}</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {
    tabs: {
      type: Array,
    },
    currentPage: {
      type: String,
    },
  },
  setup(props, context) {
    console.log(props.tabs)
    console.log(props.currentPage)
    const taskPageStore = inject(TaskPageStoreKey)

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
  z-index: 2;
}
.tab {
  outline: 0;
  &.--active {
    border-bottom: 2px solid black;
  }
}
p {
  &.--active {
    font-weight: bold;
  }
}
</style>
