<template>
  <div class="mt-16 pt-12 h-full" @click="onTasksPageClick">
    <NkdTaskSubHeader
      :tabs="contents"
      @onTabClick="changeContent"
      :currentPage="currentPage"
    />
    <TasksIndex
      v-if="currentTabIndex == 1"
      :today="today"
      :tomorrow="tomorrow"
    />
    <TasksList
      v-else-if="currentTabIndex == 2"
      :epicTasksArray="EpicTasksStore.epicTasks"
    />
    <NkdDrawer id="task-drawer" :isActive="taskPageStore.isDrawerOpen">
      <NkdTasksDrawerContent
        :epic="taskPageStore.epic"
        :tasks="taskPageStore.tasks"
      />
    </NkdDrawer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  PropType,
  inject,
  computed,
} from '@vue/composition-api'
import NkdTaskSubHeader from '@/components/v1/organisms/NkdTasksSubHeader/NkdTasksSubHeader.vue'
import TasksIndex from './Contents/TasksIndex.vue'
import NkdDrawer from '@/components/v1/organisms/NkdDrawer/NkdDrawer.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey.ts'
import NkdTasksDrawerContent from '@/components/v1/organisms/NkdTasksDrawerContent/NkdTasksDrawerContent.vue'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

export default defineComponent({
  components: {
    NkdTaskSubHeader,
    NkdDrawer,
    NkdTasksDrawerContent,
  },
  props: {
    today: {
      type: Array as PropType<EpicTasks[]>,
      required: false,
    },
    tomorrow: {
      type: Array as PropType<EpicTasks[]>,
      required: false,
    },
  },
  setup(props, context) {
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: '/tasks' },
      { id: 2, title: 'リスト', route: '/tasks/list' },
    ])
    const currentTabIndex = ref(1)
    const currentPage = context.root.$route.path
    const taskPageStore = inject(TaskPageStoreKey)

    const EpicTasksStore = inject(EpicTasksStoreKey)

    context.root.$axios
      .get('/api/v1/epics/epic_tasks')
      .then((res) => {
        EpicTasksStore.setEpicTasks(res.data.epic_tasks)
        // res.data.epic_tasks.forEach((epicTasks: EpicTasks) => {
        //   epicTasksArray.push(epicTasks)
        // })
      })
      .catch((e) => {
        console.log(e)
      })

    const onTasksPageClick = (e: Event) => {
      if (
        ((e.target as HTMLInputElement).parentElement as HTMLInputElement)
          .id !== 'drawer-content' &&
        (e.target as HTMLInputElement).id !== 'drawer-content' &&
        (e.target as HTMLInputElement).id !== 'epic-tasks__card'
      ) {
        taskPageStore.closeDrawer()
      }
    }
    switch (currentPage) {
      case '/tasks/list':
        currentTabIndex.value = 2
    }

    const changeContent = (id: number, route: string) => {
      currentTabIndex.value = id
      switch (route) {
        case '/tasks':
          context.root.$router.push('/tasks')
          break
        case '/tasks/list':
          context.root.$router.push('/tasks/list')
          break
      }
    }

    return {
      contents,
      currentTabIndex,
      currentPage,
      changeContent,
      taskPageStore,
      onTasksPageClick,
      EpicTasksStore,
    }
  },
})
</script>
