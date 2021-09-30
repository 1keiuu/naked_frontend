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
    labels: Array,
    totalData: Array,
    monthData: Array,
    options: Object,
  },
  components: { HorizontalBar },
  extends: HorizontalBar,
  setup(props, context) {
    const horizontal = ref()
    // propsのまま代入すると出ない
    const users = ref(props.labels)
    //refの関係上graphpageでdatasetsを設定するとグラフが表示されない
    const datasets = reactive({
      labels: users.value,
      // 表示するデータ
      datasets: [
        {
          data: props.totalData,
          label: '総実施回数',
          borderColor: 'red',
          backgroundColor: '#f19b9b',
          minBarLength: 0,
        },
        {
          data: props.monthData,
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
