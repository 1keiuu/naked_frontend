<template>
  <div class="bg-gray-100 min-h-screen">
    <NkdHeader :loggedIn="loggedIn" :avatarUrl="avatarUrl" />
    <div class="flex h-screen">
      <NkdSideBar :loggedIn="loggedIn" />
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
import NkdHeader from '../components/v1/organisms/NkdHeader/NkdHeader.vue'
import NkdSideBar from '../components/v1/organisms/NkdSideBar/NkdSideBar.vue'

import { defineComponent, ref, watchEffect } from '@vue/composition-api'
export default defineComponent({
  components: {
    NkdHeader,
    NkdSideBar,
  },

  setup(_props, context) {
    const loggedIn = ref(false)
    const avatarUrl = ref('')

    watchEffect(() => {
      loggedIn.value = context.root.$auth.state.loggedIn
      avatarUrl.value = context.root.$auth.state.user.avatar_url
    })
    return { loggedIn, avatarUrl }
  },
})
</script>
