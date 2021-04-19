<template>
  <div>
    <div class="mb-1">
      {{report.description}}
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  watch,
  computed,
} from '@vue/composition-api'

export default defineComponent({
  components: {},
  props: {
    record: {
      type: Object,
    },
  },
  setup(props, context) {
    return {}
  },
})
</script>
<style scoped lang="scss">
</style>
