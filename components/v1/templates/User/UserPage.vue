<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <div class="show-page">
      <img
        src="~/assets/images/avatar.jpg"
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover show-page__image"
      />
      <div>{{ user.name }}</div>
      <div v-if="current_user_id == user.id">
        <button class="mr-5">
          <p>プロフィールの編集</p>
        </button>
      </div>
      <div v-else-if="followBoolean  == true">
        <button class="mr-5" @click="onUnFollowBtnClick">
          <p>フォロ-を外す</p>
        </button>
      </div>
      <div v-else>
        <button class="mr-5" @click="onFollowBtnClick">
          <p>フォローする</p>
        </button>
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

    const onUnFollowBtnClick = () => {
      if (props.user) {
        context.root.$axios
          .post('api/v1/relationships/unfollow', {
            follow_id: props.user.id,
          })
          .then((res) => {
            if (!props.user) return
            followBoolean.value = false
          })
          .catch((e) => {})
      }
    }
    return {
      current_user_id,
      onFollowBtnClick,
      onUnFollowBtnClick,
      followBoolean,
    }
  },
})
</script>

<style scoped lang="scss">
.show-page {
  -webkit-box-align: center;
  align-items: center;
  border-bottom: 1px solid rgb(220, 228, 243);
  display: flex;
  height: 60px;
  z-index: 2;
  padding: 0px 30px;
  width: 100%;
  position: sticky;
  top: 110px;
  &__image {
    border: 4px solid rgb(255, 255, 255);
    height: 180px;
    width: 180px;
    overflow: hidden;
    background: rgb(242, 241, 249);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
}
</style>
