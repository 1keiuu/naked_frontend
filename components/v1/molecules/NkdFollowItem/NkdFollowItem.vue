<template>
  <div class="follow-card">
    <div v-if="current_user_id == user.id"/>
    <button v-else-if="followBoolean  == true" class="mr-5 follow-card__button" @click="onUnFollowBtnClick">
      <p>フォローを外す</p>
    </button>
    <button v-else class="mr-5 follow-card__button2" @click="onFollowBtnClick">
      <p>フォローする</p>
    </button>
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
  },
  components: {},
  setup(props, context) {
    const followBoolean = ref(false)
    const current_user_id = context.root.$auth.user.id
    context.root.$axios
      .post('api/v1/users/followings', {
        follow: {
          user_id: props?.user?.id,
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
.follow-card {
  &__button {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #c0c4c5;
    height: 32px;
    padding: 0px 12px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    border: 1px solid #dfe3e6;
  }
  &__button2 {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #f5fafb;
    height: 32px;
    padding: 0px 12px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 500;
    color: #615959;
    margin-left: 10px;
    border: 1px solid #dfe3e6;
  }
}
</style>
