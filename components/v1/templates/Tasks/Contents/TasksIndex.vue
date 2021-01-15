<template>
  <div class="min-h-full">
    <div class="epic-tasks__group">
      <h2 class="ml-5 text-xl">今日</h2>
      <p v-if="today.length <= 0" class="pl-10">タスクはありません</p>
      <NkdEpicTasks
        v-else-if="today.length >= 1"
        v-for="(data, i) in today"
        :key="'today-epic-accordion' + i"
        :task="data.task"
        :subTasks="data.sub_task"
        @updateTaskDate="updateTaskDate"
      />
    </div>
    <div class="epic-tasks__group">
      <h2 class="ml-5 text-xl">明日</h2>
      <p v-if="tomorrow.length <= 0" class="pl-10">タスクはありません</p>
      <NkdEpicTasks
        v-else-if="tomorrow.length >= 1"
        v-for="(data, i) in tomorrow"
        :key="'tomorrow-epic-accordion' + i"
        :task="data.task"
        :subTasks="data.sub_task"
        @updateTaskDate="updateTaskDate"
      />
    </div>
    <div class="epic-tasks__group">
      <h2 class="ml-5 text-xl">期日未設定</h2>
      <p
        v-if="noDate.length <= 0 && !taskPageStore.isCreatingEpic"
        class="pl-10"
      >
        タスクはありません
      </p>
      <NkdEpicTasks
        v-else-if="noDate.length >= 1"
        v-for="(data, i) in noDate"
        :key="'tomorrow-epic-accordion' + i"
        :task="data.task"
        :subTasks="data.sub_task"
        @updateTaskDate="updateTaskDate"
      />
      <NkdEpicTasksInput @onInputBlur="dispatchEvent" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'
import taskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
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
    NkdEpicTasks,
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
