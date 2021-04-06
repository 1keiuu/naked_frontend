<template>
  <div class="overflow-scroll">
    <Pie ref="doughnut"/>
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

    console.log(datasets)

    onMounted(() => {
      doughnut.value.renderChart(datasets, props.options)
    })

    return { doughnut }
  },
})
</script>
<style scoped lang="scss">
</style>
