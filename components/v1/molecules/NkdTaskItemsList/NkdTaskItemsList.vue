<template>
  <div>
    <NkdTaskItem
      v-for="task in tasks"
      :key="'task' + epic.id + '-' + task.id"
      :task="task"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdTaskItem from '@/components/v1/molecules/NkdTaskItem/NkdTaskItem.vue'

export default defineComponent({
  props: {
    epic: Object as PropType<Epic>,
    tasks: {
      type: Object as PropType<Task[]>,
    },
  },
  setup(props, context) {},
})
</script>
