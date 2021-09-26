<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <!-- <NkdDoughnutGraph
        v-if="loaded"
        :options = "options"
        :labels = "taskTitles"
        :data = "timeRationals"
        :backgroundColor = "taskColors"
      />
      <GraphToday
        :today="tasksStore.todayTasks"
      /> -->
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
    const tasksStore = inject(TasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)
    const timeRationals = ref([])
    const taskTitles = ref([])
    const taskColors = ref([])
    const loaded = ref(false)

    return {
      loaded,
      taskTitles,
      timeRationals,
      taskColors,
      tasksStore,
    }
  },
})
</script>

<style scoped lang="scss">
</style>
