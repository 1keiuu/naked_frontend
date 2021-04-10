<template>
  <div class="task-page w-full h-full">
    <GraphHeader
    />
    <GraphMonthPage/>
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
import GraphMonthPage from '@/components/v1/templates/Graph/GraphMonthPage.vue'
import GraphHeader from '@/components/v1/templates/Graph/GraphHeader.vue'

export default defineComponent({
  props: {},
  components: {
    GraphMonthPage,
    GraphHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
