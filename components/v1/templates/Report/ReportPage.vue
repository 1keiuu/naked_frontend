<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <div class="report-card" :class="{ '--active': reportPageStore.isCreatingReport }">
      <div class="report-card__modal" :class="{ '--active': reportPageStore.isCreatingReport }">
        <NkdReportModal/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  PropType,
  onMounted,
  inject,
} from '@vue/composition-api'
import NkdReportModal from '@/components/v1/organisms/NkdReportModal/NkdReportModal.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'
import GraphToday from '@/components/v1/templates/Graph/Contents/GraphToday.vue'

export default defineComponent({
  props: {},
  components: { NkdReportModal, GraphToday },
  setup(props, context) {
    const reportPageStore = inject(ReportPageStoreKey)
    return { reportPageStore }
  },
})
</script>

<style scoped lang="scss">
.report-card {
  &.--active {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding-top: 100px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    top: 0px;
    left: 0px;
    overflow: hidden;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
  }
  // &__modal {
  //   max-width: 600px;
  //   overflow: visible;
  //   transition: width 150ms ease 0s;
  //   position: relative;
  //   height: fit-content;
  //   width: 100%;
  //   background: rgb(251, 251, 253);
  //   // box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px;
  //   border-radius: 16px;
  //   z-index: 1;
  //   max-height: calc(100vh - 140px);
  // }
  &__modal {
    &.--active {
      font-weight: bold;
      max-width: 600px;
      overflow: visible;
      transition: width 150ms ease 0s;
      position: relative;
      height: fit-content;
      width: 100%;
      background: rgb(251, 251, 253);
      height: 600px;
      border-radius: 16px;
      z-index: 1;
      max-height: calc(100vh - 140px);
    }
  }
}
</style>
