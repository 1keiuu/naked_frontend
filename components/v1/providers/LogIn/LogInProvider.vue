<template>
  <div class="log-in__provider w-full">
    <slot />
  </div>
</template>
<script>
import { defineComponent, provide } from '@vue/composition-api'
import LogInStore from '~/store/LogIn/LogIn'
import LogInStoreKey from '../../storeKeys/LogInStoreKey.ts'

export default defineComponent({
  setup(_props, context) {
    provide(LogInStoreKey, LogInStore())
    return {}
  },
})
</script>
