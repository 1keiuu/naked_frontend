<template>
  <div>
    <NkdGraphItem
      v-for="task in tasks"
      :key="'task' + task.id + type"
      :task="task"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdGraphItem from '@/components/v1/molecules/NkdGraphItem/NkdGraphItem.vue'

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
    },
    type: { type: String },
  },
  components: { NkdGraphItem },
  setup(_props, context) {
    return {}
  },
})
</script>
<style scoped></style>
