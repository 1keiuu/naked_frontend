<template>
  <header
    :class="{ '--active': loggedIn }"
    class="nkd-header fixed bg-white top-0 px-3 z-5 h-16 w-full items-center justify-end border-gray-300 border-b-2"
  >
    <button @click="signOut"><p>ログアウト</p></button>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
export default defineComponent({
  name: 'NkdHeader',
  props: {
    loggedIn: {
      type: Boolean,
      requied: true,
    },
  },
  setup(_props, context) {
    const signOut = (e: Event) => {
      context.root.$auth.logout()
    }
    return { signOut }
  },
})
</script>
<style scoped lang="scss">
.nkd-header {
  display: none;
  &.--active {
    display: flex;
  }
}
</style>
