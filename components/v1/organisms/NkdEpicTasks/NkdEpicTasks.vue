<template>
  <div class="epic-tasks__card">
    <h3 class="text-xl">{{ epic.title }}</h3>
    <NkdTaskItemsList :epic="epic" :tasks="tasks" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
export default defineComponent({
  props: {
    epic: {
      type: Object as PropType<Epic>,
    },
    tasks: {
      type: Array as PropType<Task[]>,
    },
  },
  setup(props, context) {},
})
</script>
