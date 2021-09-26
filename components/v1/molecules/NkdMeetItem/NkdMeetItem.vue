<template>
  <div class="follow-card">
    <div v-if="current_user_id == user.id"/>
    <button class="mr-5 follow-card__button" @click="onCreateBtnClick">
      <p>1on1を申し込む</p>
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
  inject,
} from '@vue/composition-api'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
    },
  },
  components: {},
  setup(props, context) {
    const meetPageStore = inject(MeetPageStoreKey)
    const current_user_id = context.root.$auth.user.id

    const onCreateBtnClick = () => {
      meetPageStore?.startCreateMeet()
      meetPageStore?.setSelectUsers([context.root.$auth.user, props.user])
      console.log(meetPageStore?.selectedUsers)
      // meetPageStore?.appendToSelectedUsers(props.user)
    }

    return {
      current_user_id,
      onCreateBtnClick,
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
