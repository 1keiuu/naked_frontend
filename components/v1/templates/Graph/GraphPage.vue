<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <!-- <NkdDoughnutSubHeader
        :tabs="contents"
        @onTabClick="changeContent"
        :currentPage="currentPage"
      /> -->
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
import NkdTDoughnutSubHeader from '@/components/v1/organisms/NkdDoughnutSubHeader/NkdDoughnutSubHeader.vue'

export default defineComponent({
  props: {},
  components: { NkdDoughnutGraph, GraphToday, NkdTDoughnutSubHeader },
  setup(props, context) {
    const tasksStore = inject(TasksStoreKey)
    const taskPageStore = inject(TaskPageStoreKey)
    const timeRationals = ref([])
    const taskTitles = ref([])
    const taskColors = ref([])
    const loaded = ref(false)
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: '/graph' },
      { id: 2, title: 'リスト', route: '/tasks/list' },
    ])
    const currentPage = context.root.$route.path
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

    const changeContent = (id: number, route: string) => {
      switch (route) {
        case '/graph':
          context.root.$router.push('/graph')
          break
        case '/tasks/list':
          context.root.$router.push('/tasks/list')
          break
      }
    }

    return {
      options,
      loaded,
      taskTitles,
      timeRationals,
      taskColors,
      tasksStore,
      contents,
      currentPage,
      changeContent,
    }
  },
})
</script>

<style scoped lang="scss">
</style>
