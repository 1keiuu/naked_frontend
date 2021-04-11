<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <div class="report-card">
      <div class="report-card__modal">
        hello
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
import NkdDoughnutGraph from '@/components/v1/organisms/NkdDoughnutGraph/NkdDoughnutGraph.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import GraphToday from '@/components/v1/templates/Graph/Contents/GraphToday.vue'

export default defineComponent({
  props: {},
  components: { NkdDoughnutGraph, GraphToday },
  setup(props, context) {
    return {}
  },
})
</script>

<style scoped lang="scss">
.report-card {
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
  &__modal {
    max-width: 600px;
    overflow: visible;
    transition: width 150ms ease 0s;
    position: relative;
    height: fit-content;
    width: 100%;
    background: rgb(251, 251, 253);
    // box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px;
    border-radius: 16px;
    z-index: 1;
    max-height: calc(100vh - 140px);
  }
}
</style>
