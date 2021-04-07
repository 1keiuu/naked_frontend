<template>
  <div class="task-page w-full h-full">
    <NkdDoughnutSubHeader
      :tabs="contents"
      @onTabClick="changeContent"
      :currentPage="currentPage"
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

import NkdTDoughnutSubHeader from '@/components/v1/organisms/NkdDoughnutSubHeader/NkdDoughnutSubHeader.vue'

export default defineComponent({
  props: {},
  components: { NkdTDoughnutSubHeader },
  setup(props, context) {
    const contents = reactive([
      { id: 1, title: '直近のタスク', route: '/graph' },
      { id: 2, title: 'リスト', route: '/tasks/list' },
    ])
    const currentPage = context.root.$route.path
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
      contents,
      currentPage,
      changeContent,
    }
  },
})
</script>

<style scoped lang="scss">
</style>
