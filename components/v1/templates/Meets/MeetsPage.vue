<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <NkdTargetItem :target="selectTarget"/>
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
import NkdTargetItem from '@/components/v1/molecules/NkdTargetItem/NkdTargetItem.vue'

export default defineComponent({
  props: {
    target: {
      type: Object,
    },
  },
  components: { NkdTargetItem },
  setup(props, context) {
    const selectTarget = ref()
    selectTarget.value = props.target
    return { selectTarget }
  },
})
</script>

<style scoped lang="scss">
</style>
