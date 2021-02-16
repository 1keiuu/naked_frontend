<template>
  <div class="task-page w-full h-full">
    <UserPage
      :user="state.user"
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

    const user_id = context.root.$auth.user.id

    context.root.$axios
      .get(`api/v1/users/${user_id}`)
      .then((res) => {
        state.user = res.data
        console.log(state.user)
      })
      .catch((e) => {
        console.error(e)
      })

    return { state }
  },
})
</script>
