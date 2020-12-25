<template>
  <div class="min-h-full">
    <NkdEpicTasks
      v-for="(epicTasks, i) in epicTasksArray"
      :key="'epic-accordion' + i"
      :epic="epicTasks.epic"
      :tasks="epicTasks.tasks"
    />
    <NkdEpicTasksInput />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdEpicTasks from '@/components/v1/organisms/NkdEpicTasks/NkdEpicTasks.vue'
import NkdEpicTasksInput from '@/components/v1/organisms/NkdEpicTasksInput/NkdEpicTasksInput.vue'
export default defineComponent({
  props: {
    epicTasksArray: {
      type: Array as PropType<EpicTasks[]>,
      required: true,
    },
  },
  components: {
    NkdEpicTasksInput,
    NkdEpicTasks,
  },
})
</script>
