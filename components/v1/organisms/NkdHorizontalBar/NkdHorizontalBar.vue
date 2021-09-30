<template>
  <div class="overflow-scroll mt-10 ml-3">
    <HorizontalBar ref="horizontal"/>
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
import { HorizontalBar } from 'vue-chartjs'

export default defineComponent({
  props: {
    // labels: Array,
    // data: Array,
    // backgroundColor: Array,
    options: Object,
  },
  components: { HorizontalBar },
  extends: HorizontalBar,
  setup(props, context) {
    const horizontal = ref()
    console.log(props.options)
    //refの関係上graphpageでdatasetsを設定するとグラフが表示されない
    const datasets = reactive({
      labels: ['Aさん', 'Bさん', 'Cさん', 'Dさん'],
      // 表示するデータ
      datasets: [
        {
          data: [3, 5, 2, 6],
          label: '総実施回数',
          borderColor: 'red',
          backgroundColor: '#f19b9b',
          minBarLength: 0,
        },
        {
          data: [2, 2, 1, 1],
          label: '今月の実施回数',
          borderColor: 'blue',
          backgroundColor: '#a6a6ec',
        },
      ],
    })

    onMounted(() => {
      horizontal.value.renderChart(datasets, props.options)
    })

    return { horizontal }
  },
})
</script>
<style scoped lang="scss">
</style>
