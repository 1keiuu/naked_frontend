<template>
  <div class="min-h-screen logIn-page pt-16 flex flex-col justify-center">
    <NkdTaskSubHeader :tabs="contents" @onTabClick="changeContent" />
    <TasksContent />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import NkdTaskSubHeader from '@/components/v1/organisms/NkdTasksSubHeader/NkdTasksSubHeader.vue'
import TasksContent from './TasksContent.vue'
export default defineComponent({
  components: {
    NkdTaskSubHeader,
  },
  setup(props, context) {
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: 'index' },
      { id: 2, title: 'リスト', route: 'list' },
    ])

    const currentTabIndex = ref(1)

    const changeContent = (id: number, route: string) => {
      currentTabIndex.value = id
      switch (route) {
        case 'index':
          console.log(route)
          context.root.$router.push('/tasks')
          break
        case 'list':
          console.log(route)
          context.root.$router.push('/tasks/list')
          break
      }
    }

    return { contents, currentTabIndex, changeContent }
  },
})
</script>
