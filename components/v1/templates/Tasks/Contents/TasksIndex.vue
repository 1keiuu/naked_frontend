<template>
  <div class="min-h-full">
    <div class="epic-tasks__group ml-5">
      <h2 class="text-xl">今日</h2>
      <p v-if="today.length <= 0" class="pl-10">タスクはありません</p>
      <NkdTaskItemsList
        v-else-if="today.length >= 1"
        :tasks="today"
        @updateTaskDate="updateTaskDate"
      />
    </div>
    <div class="epic-tasks__group ml-5">
      <h2 class="text-xl">明日</h2>
      <p v-if="tomorrow.length <= 0" class="pl-10">タスクはありません</p>
      <NkdTaskItemsList
        v-else-if="tomorrow.length >= 1"
        :tasks="tomorrow"
        @updateTaskDate="updateTaskDate"
      />
    </div>
    <div class="tasks-group ml-5">
      <h2 class="text-xl">期日未設定</h2>
      <p
        v-if="noDate.length <= 0 && !taskPageStore.isCreatingEpic"
        class="pl-10"
      >
        タスクはありません
      </p>
      <NkdTaskItemsList
        v-else-if="noDate.length >= 1"
        :tasks="noDate"
        @updateTaskDate="updateTaskDate"
      />
      <NkdTasksInput @onInputBlur="dispatchEvent" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/organisms/NkdTaskItemsList/NkdTaskItemsList.vue'
import taskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdTasksInput from '@/components/v1/organisms/NkdTasksInput/NkdTasksInput.vue'
export default defineComponent({
  props: {
    today: {
      type: Array as PropType<Task[]>,
      required: false,
    },
    tomorrow: {
      type: Array as PropType<Task[]>,
      required: false,
    },
    noDate: {
      type: Array as PropType<Task[]>,
      required: false,
    },
  },
  components: {
    NkdTaskItemsList,
    NkdTasksInput,
  },
  setup(props, context) {
    const dispatchEvent = (inputValue: string) => {
      context.emit('onInputBlur', inputValue)
    }
    const updateTaskDate = (inputValue: Task) => {
      context.emit('updateTaskDate', inputValue)
    }
    const taskPageStore = inject(taskPageStoreKey)
    return { dispatchEvent, taskPageStore, updateTaskDate }
  },
})
</script>
<style scoped lang="scss">
</style>
