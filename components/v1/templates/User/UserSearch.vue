<template>
  <div class="mt-16 pl-56 pt-3">
    <div v-for="user in users.users" :key="user.name">
      <!-- <div class="box pt-3" @click="onUserClick(user.id)"> -->
      <div class="box pt-3">
        <div class="box__card">
          <img
            :src="user.avatar_url"
            v-if="user.avatar_url"
            id="avatar"
            class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
          />
          <img
          src="~/assets/images/avatar.jpg"
          v-else
          id="avatar"
          class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover mb-2"
          />
          <div>
            {{ user.name }}
          </div>
        </div>
        <div class="box__follow-card">
          <!-- <NkdFollowItem :user="user"/> -->
          <NkdMeetItem :user="user"/>

        </div>
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
  onMounted,
} from '@vue/composition-api'

import NkdMeetItem from '@/components/v1/molecules/NkdMeetItem/NkdMeetItem.vue'
import NkdFollowItem from '@/components/v1/molecules/NkdFollowItem/NkdFollowItem.vue'

export default defineComponent({
  props: {
    users: {},
  },
  components: {
    NkdFollowItem,
    NkdMeetItem,
  },
  setup(_props, context) {
    const onUserClick = (userId: any) => {
      context.root.$router.push(`/users/${userId}`)
    }
    return { onUserClick }
  },
})
</script>
<style scoped lang="scss">
.box {
  display: flex;
  border-bottom: 1px solid rgb(238, 238, 238);
  align-items: center;
  transition: opacity 150ms ease 0s;
  &__card {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &__follow-card {
    flex: 2;
  }
}
.box:hover {
  background: #f1f4f7;
}
</style>
