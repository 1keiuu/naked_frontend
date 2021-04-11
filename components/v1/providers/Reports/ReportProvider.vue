<template>
  <div class="tasks__provider w-full h-full">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import TaskPageStoreKey from '../../storeKeys/TaskPageStoreKey'

export default defineComponent({
  setup(_props, context) {
    return {}
  },
})
</script>
