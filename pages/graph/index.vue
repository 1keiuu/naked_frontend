<template>
  <div class="task-page w-full h-full">
    <GraphHeader
    />
    <GraphPage/>
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
import GraphPage from '@/components/v1/templates/Graph/GraphPage.vue'
import GraphHeader from '@/components/v1/templates/Graph/GraphHeader.vue'

export default defineComponent({
  props: {},
  components: {
    GraphPage,
    GraphHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
