<template>
  <div class="task-page w-full h-full">
    <UserPage
      :user="state.user"
      :props="userId"
    >
    </UserPage>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import UserPage from '@/components/v1/templates/User/UserPage.vue'

export default defineComponent({
  components: { UserPage },
  setup(_props, context) {
    const state = reactive({
      user: <User>{},
    })

    const userId = context.root.$route.params.id
    //ここが違う、urlからidを持ってくる方法

    context.root.$axios
      .get(`api/v1/users/${userId}`)
      .then((res) => {
        state.user = res.data.user
        console.log(state.user)
      })
      .catch((e) => {
        console.error(e)
      })

    return { state, userId }
  },
})
</script>
