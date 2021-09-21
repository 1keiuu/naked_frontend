<template>
  <div class="task-page w-full h-full">
    <MeetsHeader
    />
    <MeetsPage/>
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
import MeetsPage from '@/components/v1/templates/Meets/MeetsPage.vue'
import MeetsHeader from '@/components/v1/templates/Meets/MeetsHeader.vue'

export default defineComponent({
  props: {},
  components: {
    MeetsPage,
    MeetsHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
