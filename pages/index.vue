<template>
  <div class="w-full h-full">
    <ReportHeader
    />
    <!-- <GraphPage/> -->
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
import ReportHeader from '@/components/v1/templates/Report/ReportHeader.vue'

export default defineComponent({
  props: {},
  components: {
    GraphPage,
    ReportHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
