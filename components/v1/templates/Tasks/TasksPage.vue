<template>
  <div
    class="mt-16 pt-12 pl-56 h-screen overflow-scroll"
    @click="onTasksPageClick"
  >
    <NkdTaskSubHeader
      :tabs="contents"
      @onTabClick="changeContent"
      :currentPage="currentPage"
    />
    <slot />
    <NkdDrawer id="task-drawer" :isActive="taskPageStore.isDrawerOpen">
      <NkdTasksDrawerContent
        :epic="taskPageStore.selectedEpic"
        :tasks="taskPageStore.selectedTasks"
        @onClickEpicDeleteButton="deleteEpic"
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
  setup(props, context) {
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: '/tasks' },
      { id: 2, title: 'リスト', route: '/tasks/list' },
    ])
    const currentPage = context.root.$route.path
    const taskPageStore = inject(TaskPageStoreKey)
    const epicTasksStore = inject(EpicTasksStoreKey)

    const onTasksPageClick = (e: Event) => {
      if (
        !(e.target as HTMLInputElement).closest('.nkd-drawer') &&
        (e.target as HTMLInputElement).id !== 'epic-tasks__card'
      ) {
        taskPageStore.closeDrawer()
      }
    }

    const changeContent = (id: number, route: string) => {
      switch (route) {
        case '/tasks':
          context.root.$router.push('/tasks')
          break
        case '/tasks/list':
          context.root.$router.push('/tasks/list')
          break
      }
    }

    const deleteEpic = () => {
      const targetId = taskPageStore.selectedEpic.id
      context.root.$axios
        .delete(`/api/v1/epics/${targetId}`)
        .then((res) => {
          taskPageStore.closeDrawer()
          // TODO: storeの削除系まとめたい
          epicTasksStore.deleteEpicTasks(targetId)
          epicTasksStore.deleteTodayEpicTasks(targetId)
          epicTasksStore.deleteTomorrowEpicTasks(targetId)
          epicTasksStore.deleteNoDateEpicTasks(targetId)
        })
        .catch((e) => {})
    }

    return {
      contents,
      currentPage,
      changeContent,
      taskPageStore,
      onTasksPageClick,
      epicTasksStore,
      deleteEpic,
    }
  },
})
</script>
