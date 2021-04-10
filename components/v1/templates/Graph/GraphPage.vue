<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <NkdDoughnutGraph
        v-if="loaded"
        :options = "options"
        :labels = "taskTitles"
        :data = "timeRationals"
        :backgroundColor = "taskColors"
      />
      <GraphToday
        :today="tasksStore.todayTasks"
      />
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

    context.root.$axios
      .get('/api/v1/tasks/today_graph_task')
      .then((res) => {
        timeRationals.value = res.data.time_rational
        taskTitles.value = res.data.task_title
        taskColors.value = res.data.color
        tasksStore.setTodayTasks(res.data.today_tasks)
        loaded.value = true
      })
      .catch((e) => {
        console.error(e)
      })
    const options = reactive({
      responsive: false,
    })

    return {
      options,
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
