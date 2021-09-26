<template>
  <div class="w-full h-full h-screen overflow-scroll meet-group">
    <UserSearch
      :users="usersStore.users"
    />
    <div class="meet-card" :class="{ '--active': meetPageStore.isCreatingMeet }">
      <div class="meet-card__modal" :class="{ '--active': meetPageStore.isCreatingMeet }">
        <NkdMeetModal/>
      </div>
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
  inject,
  watchEffect,
} from '@vue/composition-api'
import UserSearch from '@/components/v1/templates/User/UserSearch.vue'
import UsersStoreKey from '@/components/v1/storeKeys/UsersStoreKey'
import NkdMeetModal from '@/components/v1/organisms/NkdMeetModal/NkdMeetModal.vue'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'

export default defineComponent({
  components: { UserSearch, NkdMeetModal },
  setup(props, context) {
    //http://localhost:4000/users/search?username=aこの形で渡ってくる
    const query = context.root.$route.query.username
    const usersStore = inject(UsersStoreKey)
    const meetPageStore = inject(MeetPageStoreKey)

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

    return { query, usersStore, meetPageStore }
  },
})
</script>

<style scoped lang="scss">
.meet-group::after {
  content: '';
  height: 100px;
  display: block;
}

.meet-card {
  &.--active {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding-top: 100px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    top: 0px;
    left: 0px;
    overflow: hidden;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
  }
  &__modal {
    &.--active {
      font-weight: bold;
      max-width: 600px;
      overflow: visible;
      transition: width 150ms ease 0s;
      position: relative;
      height: fit-content;
      width: 100%;
      background: rgb(251, 251, 253);
      height: 450px;
      border-radius: 16px;
      z-index: 1;
      max-height: calc(100vh - 140px);
    }
  }
}
</style>
