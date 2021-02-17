<template>
  <div
    class="mt-16 pt-12 pl-56 h-screen overflow-scroll"
  >
    <div>{{ user.name}}</div>
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
    <div v-else>
      <button class="mr-5"  @click="onFollowBtnClick">
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
} from '@vue/composition-api'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
    },
  },
  components: {},
  setup(props, context) {
    var followBoolean = ref(false)
    const current_user_id = context.root.$auth.user.id
    if (props.user) {
      console.log(props.user.id)
      context.root.$axios
        .post('api/v1/users/followings', {
          a_user_id: props.user.id,
          current_user_id: current_user_id,
        })
        .then((res) => {
          followBoolean = res.data.boolean
        })
        .catch((e) => {
          console.error(e)
        })
    }

    const onFollowBtnClick = () => {
      if (props.user) {
        context.root.$axios
          .post('api/v1/relationships', {
            follow_id: props.user.id,
          })
          .then((res) => {
            if (!props.user) return
            followBoolean = ref(true)
          })
          .catch((e) => {})
      }
    }
    return { current_user_id, onFollowBtnClick }
  },
})
</script>
