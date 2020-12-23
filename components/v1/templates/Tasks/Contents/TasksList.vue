<template>
  <div>
    <NkdEpicTasks
      v-for="(epicTasks, i) in epicTasksArray"
      :key="'epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'
export default defineComponent({
  props: {
    epicTasksArray: {
      type: Array as PropType<EpicTasks[]>,
      required: true,
    },
  },
})
</script>
