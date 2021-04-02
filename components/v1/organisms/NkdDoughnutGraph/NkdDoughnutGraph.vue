<template>
  <div class="h-screen overflow-scroll">
    <Pie ref="doughnut"></Pie>
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
import { Pie } from 'vue-chartjs'

export default defineComponent({
  props: {
    labels: Array,
    data: Array,
    backgroundColor: Array,
    options: Object,
  },
  components: { Pie },
  extends: Pie,
  setup(props, context) {
    const doughnut = ref()
    //refの関係上graphpageでdatasetsを設定するとグラフが表示されない
    const datasets = reactive({
      labels: props.labels,
      // 表示するデータ
      datasets: [
        {
          data: props.data,
          backgroundColor: props.backgroundColor,
        },
      ],
    })
    console.log(doughnut)
    // doughnut.value.$refs.canvas.clientHeight = 500
    // doughnut.value.$refs.canvas.clientHeight = 500

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      // doughnut.value.$refs.canvas.clientHeight = 500
      // doughnut.value.$refs.canvas.clientHeight = 500
      doughnut.value.renderChart(datasets, props.options)
      // doughnut.value.$refs.canvas.clientHeight = 500
      // doughnut.value.$refs.canvas.clientHeight = 500
      // doughnut.value.height = 500
      // doughnut.value.width = 500
      console.log(doughnut)
    })
    // doughnut.value.$refs.canvas.offsetHeight = 500
    // doughnut.value.$refs.canvas.offsetWidth = 500
    // doughnut.value.$refs.canvas.height = 500
    // doughnut.value.$refs.canvas.width = 500

    return { doughnut }
  },
})
</script>
<style scoped lang="scss">
</style>
