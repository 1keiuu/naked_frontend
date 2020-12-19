<template>
  <div class="min-h-screen logIn-page pt-16 flex flex-col justify-center">
    <NkdTaskSubHeader :tabs="contents" @onTabClick="changeContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import NkdTaskSubHeader from '@/components/v1/organisms/NkdTasksSubHeader/NkdTasksSubHeader.vue'
export default defineComponent({
  components: {
    NkdTaskSubHeader,
  },
  setup() {
    const contents = reactive([
      { id: 1, title: '直近のタスク' },
      { id: 2, title: 'リスト' },
    ])

    const currentTabIndex = ref(1)

    const changeContent = (id: number) => {
      currentTabIndex.value = id
    }

    return { contents, currentTabIndex, changeContent }
  },
})
</script>
