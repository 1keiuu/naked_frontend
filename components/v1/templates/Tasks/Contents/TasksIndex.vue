<template>
  <div class="min-h-full">
    <div class="epic-tasks__group">
      <h2 class="ml-5 text-xl">今日</h2>
      <NkdEpicTasks
        v-for="(epicTasks, i) in today"
        :key="'today-epic-accordion' + i"
        :epic="epicTasks.epic"
        :tasks="epicTasks.tasks"
      />
    </div>
    <div class="epic-tasks__group">
      <h2 class="ml-5 text-xl">明日</h2>
      <NkdEpicTasks
        v-for="(epicTasks, i) in tomorrow"
        :key="'tomorrow-epic-accordion' + i"
        :epic="epicTasks.epic"
        :tasks="epicTasks.tasks"
      />
    </div>
    <div class="epic-tasks__group">
      <h2 class="ml-5 text-xl">期日未設定</h2>
      <!-- <NkdEpicTasks
        v-for="(epicTasks, i) in tomorrow"
        :key="'tomorrow-epic-accordion' + i"
        :epic="epicTasks.epic"
        :tasks="epicTasks.tasks"
      /> -->
      <NkdEpicTasksInput @onInputBlur="dispatchEvent" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'

export default defineComponent({
  props: {
    today: {
      type: Array as PropType<EpicTasks[]>,
      required: false,
    },
    tomorrow: {
      type: Array as PropType<EpicTasks[]>,
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
    return { dispatchEvent }
  },
})
</script>
