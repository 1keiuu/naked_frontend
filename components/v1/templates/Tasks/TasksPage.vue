<template>
  <div
    class="mt-16 pt-12 pl-56 h-screen overflow-scroll root"
    @click="onTasksPageClick"
  >
    <NkdTaskSubHeader
      :tabs="contents"
      @onTabClick="changeContent"
      :currentPage="currentPage"
    />
    <slot />
    <NkdDrawer ref='root' :isActive="taskPageStore.isDrawerOpen">
      <NkdTasksDrawerContent
        :task="taskPageStore.selectedTask"
        :subTasks="taskPageStore.selectedSubTasks"
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
  onMounted,
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
    TaskPageStoreKey,
  },
  setup(props, context) {
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: '/tasks' },
      { id: 2, title: 'リスト', route: '/tasks/list' },
    ])
    const root = ref(null)
    const currentPage = context.root.$route.path
    const taskPageStore = inject(TaskPageStoreKey)
    const epicTasksStore = inject(EpicTasksStoreKey)

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(root.value) // <div/>
    })

    const onTasksPageClick = (e: Event) => {
      if (
        !(e.target as HTMLInputElement).closest('.nkd-drawer') &&
        (e.target as HTMLInputElement).id !== 'task-card' &&
        root.value.$el.id === 'task-drawer'
      ) {
        taskPageStore.closeDrawer()
        console.log(root.value.$el.id)
        //リアルタイム同期はできないがdrawerとurl変えることになるので強制リダイレクト
        context.root.$router.go(0)
        // context.root.$router.go({
        //   path: context.root.$route.path,
        //   force: true,
        // })
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
      const targetId = taskPageStore.selectedTask.id
      context.root.$axios
        .delete(`/api/v1/tasks/${targetId}`)
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

    window.addEventListener('beforeunload', (event) => {
      const condition = [
        taskPageStore.isCreatingEpic,
        taskPageStore.isUpdatingEpic,
        taskPageStore.isCreatingTask,
      ]
      if (
        condition.every((bool) => {
          return !bool
        })
      )
        return
      //Chromeではデフォルトの文言が表示される.
      event.preventDefault()
      event.returnValue = '編集中です。本当に他のページに移動しますか?'
    })

    return {
      contents,
      currentPage,
      changeContent,
      taskPageStore,
      onTasksPageClick,
      epicTasksStore,
      deleteEpic,
      root,
    }
  },
})
</script>
