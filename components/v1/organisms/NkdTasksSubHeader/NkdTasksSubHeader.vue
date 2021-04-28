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
    <button class="mr-5 task__sub-header__button" @click="onCreateTaskBtnClick">
      <p>タスクを作成</p>
    </button>
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
    const taskPageStore = inject(TaskPageStoreKey)

    const onTabClick = (id: number, route: string) => {
      context.emit('onTabClick', id, route)
    }
    const onCreateTaskBtnClick = () => {
      taskPageStore.startCreateTask()
    }

    return { onTabClick, onCreateTaskBtnClick }
  },
})
</script>
<style scoped lang="scss">
.task__sub-header {
  top: 4em;
  z-index: 2;
  &__button {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #50bfff;
    height: 32px;
    padding: 0px 12px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    border: 1px solid #a4cef9;
  }
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
