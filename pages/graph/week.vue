<template>
  <div class="task-page w-full h-full">
    <GraphHeader
    />
    <GraphWeekPage/>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  PropType,
  onMounted,
  inject,
} from '@vue/composition-api'
import GraphWeekPage from '@/components/v1/templates/Graph/GraphWeekPage.vue'
import GraphHeader from '@/components/v1/templates/Graph/GraphHeader.vue'

export default defineComponent({
  props: {},
  components: {
    GraphWeekPage,
    GraphHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
