<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <Doughnut ref="doughnut"></Doughnut>
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
} from '@vue/composition-api'
import { Doughnut } from 'vue-chartjs'

export default defineComponent({
  props: {
    datasets: {
      type: Object,
    },
    options: Object,
  },
  components: { Doughnut },
  extends: Doughnut,
  setup(props, context) {
    const doughnut = ref()

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      doughnut.value.renderChart(props.datasets, props.options)
    })

    return { doughnut }
  },
})
</script>
