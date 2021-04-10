<template>
  <div class="task-page w-full h-full">
    <NkdReportSubHeader
    />
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

import NkdReportSubHeader from '@/components/v1/organisms/NkdReportSubHeader/NkdReportSubHeader.vue'

export default defineComponent({
  props: {},
  components: { NkdReportSubHeader },
  setup(props, context) {
    return {}
  },
})
</script>

<style scoped lang="scss">
</style>
