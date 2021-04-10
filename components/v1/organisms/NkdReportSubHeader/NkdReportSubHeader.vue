<template>
  <div
    class="report__sub-header w-full left-0 h-12 pl-56 bg-white fixed flex items-center justify-between"
  >
    <div class="report__sub-header__group h-full">
      最近の活動
    </div>
    <button class="mr-5 report__sub-header__button" @click="onCreateTaskBtnClick">
      <p>日報を作成</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {},
  setup(props, context) {
    const taskPageStore = inject(TaskPageStoreKey)

    const onCreateTaskBtnClick = () => {
      taskPageStore.startCreateTask()
    }

    return { onCreateTaskBtnClick }
  },
})
</script>
<style scoped lang="scss">
.report__sub-header {
  top: 4em;
  z-index: 2;
  &__group {
    padding: 10px;
    font-size: 20px;
    font-weight: 550;
  }
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
