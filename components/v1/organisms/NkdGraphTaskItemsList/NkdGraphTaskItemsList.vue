<template>
  <div>
    <NkdGraphItem
      v-for="task in tasks"
      :key="'task' + task.id"
      :task="task"
      :graphType="graphType"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
} from '@vue/composition-api'
import NkdGraphItem from '@/components/v1/molecules/NkdGraphItem/NkdGraphItem.vue'

export default defineComponent({
  props: {
    tasks: Array,
    graphType: String,
  },
  components: { NkdGraphItem },
  setup(props, context) {
    return {}
  },
})
</script>
<style scoped></style>
