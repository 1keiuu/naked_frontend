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
    user: {
      type: Object as PropType<User>,
    },
    userId: String,
  },
  components: { Doughnut },
  extends: Doughnut,
  setup(props, context) {
    var randomColor = require('random-color')
    const labels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    const current_user_id = context.root.$auth.user.id
    const doughnut = ref()
    const datasets = reactive({
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // 表示するデータ
      datasets: [
        {
          data: [10, 15, 6, 22, 11, 49, 32],
          backgroundColor: [
            '#' + ((Math.random() * 0xffffff) << 0).toString(16),
            '#' + ((Math.random() * 0xffffff) << 0).toString(16),
          ],
        },
      ],
    })
    const options = reactive({
      responsive: true,
    })

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      doughnut.value.renderChart(datasets, options)
    })

    return { doughnut }
  },
})
</script>
