<template>
  <div class="w-full h-full">
    <ReportHeader
    />
    <ReportPage/>
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
import ReportPage from '@/components/v1/templates/Report/ReportPage.vue'
import ReportHeader from '@/components/v1/templates/Report/ReportHeader.vue'

export default defineComponent({
  props: {},
  components: {
    ReportPage,
    ReportHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
