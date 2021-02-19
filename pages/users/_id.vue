<template>
  <div class="task-page w-full h-full">
    <UserPage :user="user" :props="userId" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import UserPage from '@/components/v1/templates/User/UserPage.vue'

export default defineComponent({
  components: { UserPage },
  setup(_props, context) {
    const user = ref({})

    const userId = context.root.$route.params.id
    //ここが違う、urlからidを持ってくる方法

    context.root.$axios
      .get(`api/v1/users/${userId}`)
      .then((res) => {
        user.value = res.data.user
      })
      .catch((e) => {
        console.error(e)
      })

    return { user, userId }
  },
})
</script>
