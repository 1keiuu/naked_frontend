<template>
  <div class="mt-16 pt-16">
    <NkdTaskSubHeader :tabs="contents" @onTabClick="changeContent" />
    <TasksIndex
      v-if="currentTabIndex == 1"
      :today="today"
      :tomorrow="tomorrow"
    />
    <TasksList
      v-else-if="currentTabIndex == 2"
      :epicTasksArray="epicTasksArray"
    />
    <NkdDrawer :isActive="taskPageStore.isDrawerOpen">
      <NkdTaskItemsList
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
export default defineComponent({
  components: {
    NkdTaskSubHeader,
    NkdDrawer,
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
    epicTasksArray: {
      type: Array as PropType<EpicTasks[]>,
      required: false,
    },
  },
  setup(props, context) {
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: 'index' },
      { id: 2, title: 'リスト', route: 'list' },
    ])
    const currentTabIndex = ref(1)
    const currentPage = context.root.$route.path.replace('/tasks/', '')
    const taskPageStore = inject(TaskPageStoreKey)

    switch (currentPage) {
      case 'list':
        currentTabIndex.value = 2
    }

    const changeContent = (id: number, route: string) => {
      currentTabIndex.value = id
      switch (route) {
        case 'index':
          context.root.$router.push('/tasks')
          break
        case 'list':
          context.root.$router.push('/tasks/list')
          break
      }
    }

    return { contents, currentTabIndex, changeContent, taskPageStore }
  },
})
</script>
