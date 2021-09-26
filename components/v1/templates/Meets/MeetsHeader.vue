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
      { id: 1, title: '通知', route: '/meets/notification' },
      { id: 2, title: '記録', route: '/meets' },
    ])
    const currentPage = context.root.$route.path
    const changeContent = (id: number, route: string) => {
      switch (route) {
        case '/meets':
          context.root.$router.push('/meets')
          break
        case '/meets/notification':
          context.root.$router.push('/meets/notification')
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
