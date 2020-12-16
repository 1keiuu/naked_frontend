<template>
  <div class="sign-up__provider">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import SignUpStore from '~/store/SignUp/SignUp'
import SignUpStoreKey from '../../storeKeys/SignUpStoreKey'

export default defineComponent({
  setup(_props, context) {
    provide(SignUpStoreKey, SignUpStore())
    return {}
  },
})
</script>
