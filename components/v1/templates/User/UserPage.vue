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
      <button class="mr-5" @click="onFollowBtnClick">
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
import NkdTasksDrawerContentVue from '../../organisms/NkdTasksDrawerContent/NkdTasksDrawerContent.vue'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
    },
    userId: String,
  },
  components: {},
  setup(props, context) {
    const followBoolean = ref(false)
    const current_user_id = context.root.$auth.user.id
    console.log(props?.user?.id)
    console.log(props.userId)

    context.root.$axios
      .post('api/v1/users/followings', {
        follow: {
          user_id: props?.userId,
          current_user_id: current_user_id,
        },
      })
      .then((res) => {
        followBoolean.value = res.data.boolean
      })
      .catch((e) => {
        console.error(e)
      })

    // const followBoolean = ref(false)
    // const current_user_id = context.root.$auth.user.id
    // if (props.user && current_user_id != props.user.id) {
    //   console.log(props)
    //   console.log(props.user)
    //   console.log(props.user.id)
    //   context.root.$axios
    //     .post('api/v1/users/followings', {
    //       user_id: props.user.id,
    //       current_user_id: current_user_id,
    //     })
    //     .then((res) => {
    //       followBoolean.value = res.data.boolean
    //     })
    //     .catch((e) => {
    //       console.error(e)
    //     })
    // }

    const onFollowBtnClick = () => {
      if (props.user) {
        context.root.$axios
          .post('api/v1/relationships', {
            follow_id: props.user.id,
          })
          .then((res) => {
            if (!props.user) return
            followBoolean.value = true
          })
          .catch((e) => {})
      }
    }
    return { current_user_id, onFollowBtnClick }
  },
})
</script>
