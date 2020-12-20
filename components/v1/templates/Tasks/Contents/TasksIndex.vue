<template>
  <div>
    <h2>Today</h2>
    <NkdEpicAccordion
      v-for="(epicTasks, i) in today"
      :key="'today-epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
    />
    <h2>Tomorrow</h2>
    <NkdEpicAccordion
      v-for="(epicTasks, i) in tomorrow"
      :key="'tomorrow-epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

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
})
</script>
