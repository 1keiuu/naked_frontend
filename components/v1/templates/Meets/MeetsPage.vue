<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <NkdTargetItem/>
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
  props: {},
  components: { NkdTargetItem },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
