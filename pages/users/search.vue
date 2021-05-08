<template>
  <div class="task-page w-full h-full">
    <UserSearch
      :users="usersStore.users"
      :avatarUrl="avatarUrl"
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
  inject,
  watchEffect,
} from '@vue/composition-api'
import UserSearch from '@/components/v1/templates/User/UserSearch.vue'
import UsersStoreKey from '@/components/v1/storeKeys/UsersStoreKey'

export default defineComponent({
  components: { UserSearch },
  setup(props, context) {
    //http://localhost:4000/users/search?username=aこの形で渡ってくる
    const query = context.root.$route.query.username
    const usersStore = inject(UsersStoreKey)

    const avatarUrl = ref('')

    watchEffect(() => {
      avatarUrl.value = context.root.$auth.state.user?.avatar_url
    })

    context.root.$axios
      .post('api/v1/users/search', {
        q: query,
      })
      .then((res) => {
        usersStore.setUsers(res.data)
      })
      .catch((e) => {
        console.error(e)
      })

    return { query, usersStore, avatarUrl }
  },
})
</script>
