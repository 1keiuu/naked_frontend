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
    labels: Array,
    data: Array,
    backgroundColor: Array,
    options: Object,
  },
  components: { Doughnut },
  extends: Doughnut,
  setup(props, context) {
    console.log(props)

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
      // the DOM element will be assigned to the ref after initial render
      doughnut.value.renderChart(datasets, props.options)
    })

    return { doughnut }
  },
})
</script>
