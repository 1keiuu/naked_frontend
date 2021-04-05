<template>
  <div>
    <NkdGraphItem
      v-for="task in tasks"
      :key="'task' + task.id + type"
      :task="task"
      :timeRational="timeRational"
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
    timeRationals: Array,
  },
  components: { NkdGraphItem },
  setup(props, context) {
    const items = reactive({
      tasks: props.tasks,
      timeRationals: props.timeRationals,
    })
    console.log(items)
    return { items }
  },
})
</script>
<style scoped></style>
