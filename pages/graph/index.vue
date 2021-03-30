<template>
  <div class="task-page w-full h-full">
    <GraphPage
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import GraphPage from '@/components/v1/templates/Graph/GraphPage.vue'

export default defineComponent({
  components: { GraphPage },
  setup(_props, context) {},
})
</script>
