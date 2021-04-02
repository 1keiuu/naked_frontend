<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <!-- <Doughnut ref="doughnut"></Doughnut> -->
    <NkdDoughnutGraph
      :datasets = "datasets"
      :options = "options"
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
    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        tasksStore.setTodayTasks(res.data.today)
      })
      .catch((e) => {
        console.error(e)
      })

    const datasets = reactive({
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // 表示するデータ
      datasets: [
        {
          data: [10, 15, 6, 22, 11, 49, 32],
          backgroundColor: [
            '#' + ((Math.random() * 0xffffff) << 0).toString(16),
            '#' + ((Math.random() * 0xffffff) << 0).toString(16),
          ],
        },
      ],
    })
    const options = reactive({
      responsive: true,
    })

    return { datasets, options }
  },
})
</script>
