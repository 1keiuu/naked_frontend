<template>
  <div class="bg-gray-100 min-h-screen">
    <NkdHeader :loggedIn="loggedIn" />
    <NkdSideBar :loggedIn="loggedIn" />
    <Nuxt />
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
    watchEffect(() => {
      loggedIn.value = context.root.$auth.state.loggedIn
    })
    return { loggedIn }
  },
})
</script>
