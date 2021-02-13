<template>
  <div class="task-page w-full h-full">
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'

export default defineComponent({
  setup(_props, context) {
    const state = reactive({
      user: <User>{},
    })

    const user_id = context.root.$auth.user.id

    context.root.$axios
      .get(`api/v1/users/${user_id}`)
      .then((res) => {
        console.log(res)
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
