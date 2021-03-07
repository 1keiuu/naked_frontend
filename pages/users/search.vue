<template>
  <div class="task-page w-full h-full">
    <UserSearch
      :users="users"
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
} from '@vue/composition-api'
import UserSearch from '@/components/v1/templates/User/UserSearch.vue'

export default defineComponent({
  components: { UserSearch },
  setup(_props, context) {
    //http://localhost:4000/users/search?username=aこの形で渡ってくる
    const users = ref({})
    const query = context.root.$route.query.username
    context.root.$axios
      .post('api/v1/users/search', {
        q: query,
      })
      .then((res) => {
        users.value = res.data
      })
      .catch((e) => {
        console.error(e)
      })

    return { query, users }
  },
})
</script>
