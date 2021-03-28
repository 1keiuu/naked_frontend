<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <div>{{ user.name }}</div>
    <div>{{ user.id }}</div>
    <img
      src="~/assets/images/avatar.jpg"
      id="avatar"
      class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
    />
    <div v-if="current_user_id == user.id">
      <button class="mr-5">
        <p>プロフィールの編集</p>
      </button>
    </div>
    <div v-else-if="followBoolean  == true">
      <button class="mr-5" @click="onUnFollowBtnClick">
        <p>フォロ-を外す</p>
      </button>
    </div>
    <div v-else>
      <button class="mr-5" @click="onFollowBtnClick">
        <p>フォローする</p>
      </button>
    </div>
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
  setup(props, context) {
    const labels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
    const current_user_id = context.root.$auth.user.id
    const datasets = reactive([
      {
        data: [10, 15, 6, 22, 11, 49, 32],
        backgroundColor: [
          '#f87979',
          '#aa4c8f',
          '#38b48b',
          '#006e54',
          '#c1e4e9',
          '#89c3eb',
          '#c3d825',
        ],
      },
    ])
    const options = reactive({
      responsive: true,
    })

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      renderChart()
    })

    return {}
  },
})
</script>
