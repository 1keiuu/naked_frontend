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
      { id: 1, title: '今日', route: '/graph' },
      { id: 2, title: '今週', route: '/graph/week' },
    ])
    const currentPage = context.root.$route.path
    const changeContent = (id: number, route: string) => {
      switch (route) {
        case '/graph':
          context.root.$router.push('/graph')
          break
        case '/graph/week':
          context.root.$router.push('/graph/week')
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
