<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <NkdTargetItem/>
      <NkdHorizontalBar
        :options="options"
        :labels = "users"
        :totalData = "totalArray"
        :monthData = "monthArray"
      />
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
import NkdHorizontalBar from '@/components/v1/organisms/NkdHorizontalBar/NkdHorizontalBar.vue'

export default defineComponent({
  props: {},
  components: { NkdTargetItem, NkdHorizontalBar },
  setup(props, context) {
    const users = ref([])
    const totalArray = ref([])
    const monthArray = ref([])
    const loaded = ref(false)
    context.root.$axios
      .get('/api/v1/meetings/user_meet')
      .then((res) => {
        users.value = res.data.users
        totalArray.value = res.data.total_array
        monthArray.value = res.data.month_array
        loaded.value = true
      })
      .catch((e) => {
        console.error(e)
      })

    const options = reactive({
      // デザインを崩さないため
      responsive: false,
      title: {
        display: true,
        fontSize: 20,
        text: '1on1の実施状況',
      },
      // これでlabelを出すか選択できる
      // legend: {
      //   display: false,
      // },
      // ゼロから始めたい
      scales: {
        xAxes: [
          // Ｘ軸のオプション
          {
            ticks: {
              min: 0,
            },
          },
        ],
      },
    })
    return {
      options,
      users,
      totalArray,
      monthArray,
      loaded,
    }
  },
})
</script>

<style scoped lang="scss">
</style>
