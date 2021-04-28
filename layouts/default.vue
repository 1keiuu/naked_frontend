<template>
  <div class="bg-gray-100 min-h-screen">
    <TasksProvider>
      <NkdHeader :loggedIn="loggedIn" :avatarUrl="avatarUrl" />
      <div class="flex h-full">
        <NkdSideBar :loggedIn="loggedIn" />
        <Nuxt />
      </div>
    </TasksProvider>
  </div>
</template>
<script lang="ts">
import NkdHeader from '../components/v1/organisms/NkdHeader/NkdHeader.vue'
import NkdSideBar from '../components/v1/organisms/NkdSideBar/NkdSideBar.vue'
import TasksProvider from '@/components/v1/providers/Tasks/TasksProvider.vue'

import { defineComponent, ref, watchEffect } from '@vue/composition-api'
export default defineComponent({
  components: {
    TasksProvider,
    NkdHeader,
    NkdSideBar,
  },

  setup(_props, context) {
    const loggedIn = ref(false)
    const avatarUrl = ref('')

    watchEffect(() => {
      loggedIn.value = context.root.$auth.state.loggedIn
      avatarUrl.value = context.root.$auth.state.user?.avatar_url
    })
    return { loggedIn, avatarUrl }
  },
})
</script>
