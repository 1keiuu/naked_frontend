<template>
  <div class="log-in__provider">
    <slot />
  </div>
</template>
<script>
import { defineComponent, provide } from '@vue/composition-api'
import LogInStore from '~/store/LogIn/LogIn'
import LogInStoreKey from '../../storeKeys/LoginStoreKey.ts'

export default defineComponent({
  setup(_props, context) {
    provide(LogInStoreKey, LogInStore())
    return {}
  },
})
</script>
