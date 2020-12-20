<template>
  <div>
    <NkdEpicAccordion
      v-for="(epicTasks, i) in epicTasksArray"
      :key="'epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdEpicAccordion from '@/components/v1/organisms/NkdEpicAccordion/NkdEpicAccordion.vue'
export default defineComponent({
  props: {
    epicTasksArray: {
      type: Array as PropType<EpicTasks[]>,
      required: true,
    },
  },
})
</script>
