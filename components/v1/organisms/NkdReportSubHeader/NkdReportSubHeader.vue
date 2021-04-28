<template>
  <div
    class="report__sub-header w-full left-0 h-12 pl-56 fixed flex items-center justify-between bg-gray-100"
  >
    <div class="report__sub-header__group h-full">
      最近の活動
    </div>
    <div class="flex mr-2">
      <button class="report__sub-header__button" @click="onCreateTaskBtnClick">
        <p>日報を作成</p>
      </button>
      <!-- <button class="mr-5 report__sub-header__button" @click="onCreateTaskBtnClick">
        <p>予定を作成</p>
      </button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'

export default defineComponent({
  props: {},
  setup(props, context) {
    const reportPageStore = inject(ReportPageStoreKey)

    const onCreateTaskBtnClick = () => {
      reportPageStore?.startCreateReport()
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
</style>
