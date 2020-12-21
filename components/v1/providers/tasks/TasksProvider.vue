<template>
  <div class="tasks__provider w-full">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import TaskStore from '~/store/Task/Task'
import TaskStoreKey from '../../storeKeys/TaskStoreKey'

export default defineComponent({
  setup(_props, context) {
    provide(TaskStoreKey, TaskStore())
    return {}
  },
})
</script>
