<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <!-- <Doughnut ref="doughnut"></Doughnut> -->
    <NkdDoughnutGraph
      v-if="loaded"
      :options = "options"
      :labels = "taskTitles"
      :data = "timeRationals"
      :backgroundColor = "taskColors"
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

export default defineComponent({
  props: {},
  components: { NkdDoughnutGraph },
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
        loaded.value = true
      })
      .catch((e) => {
        console.error(e)
      })
    console.log(taskColors)
    console.log(timeRationals.value)

    // const datasets = reactive({
    //   // labels: taskTitles,
    //   // datasets: [
    //   //   {
    //   //     data: timeRationals,
    //   //     backgroundColor: taskColors,
    //   //   },
    //   // ],
    //   labels: taskTitles,
    //   // 表示するデータ
    //   datasets: [
    //     {
    //       data: timeRationals.value,
    //       backgroundColor: ['#e11ba4', '#ab0ea', '#edf8a2'],
    //     },
    //   ],
    // })
    const options = reactive({
      responsive: true,
    })

    return { options, loaded, taskTitles, timeRationals, taskColors }
  },
})
</script>
