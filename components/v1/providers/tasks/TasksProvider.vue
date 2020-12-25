<template>
  <div class="tasks__provider w-full h-full">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from '@vue/composition-api'
import TaskStore from '~/store/Task/Task'
import TaskStoreKey from '../../storeKeys/TaskStoreKey'
import TaskPageStore from '~/store/Task/TaskPage'
import TaskPageStoreKey from '../../storeKeys/TaskPageStoreKey'

export default defineComponent({
  setup(_props, context) {
    provide(TaskStoreKey, TaskStore())
    provide(TaskPageStoreKey, TaskPageStore())

    return {}
  },
})
</script>
