<template>
  <div v-if="meetPageStore.isCreatingMeet">
    <div class="meet-header" @click="clickCloseClick">
      <NkdIcon type="close" color="black" class="meet-header__close"/>
    </div>
    <div>
      <div class="meet-body">
        <div class=meet-body__text>
          <NkdLabel name="meet-description" value="コメント" class="mt-10" />
          <NkdTextArea
            @onTextAreaBlur="setMeet"
            :isOutLined="true"
            name="meet-description"
          />
        </div>
      </div>
      <div class="meet-bottom">
        <button class="meet-bottom__button" @click="onCreateMeetBtnClick">
          <p>申し込む</p>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  onMounted,
  watch,
} from '@vue/composition-api'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'

export default defineComponent({
  components: {},
  props: {},
  setup(props, context) {
    const meetPageStore = inject(MeetPageStoreKey)
    const meetDescription = ref()

    const setMeet = (inputValue: string) => {
      meetDescription.value = inputValue
    }

    const onCreateMeetBtnClick = () => {
      meetPageStore?.stopCreateMeet()

      context.root.$axios
        .post('/api/v1/meetings', {
          description: meetDescription.value,
          user_ids: meetPageStore?.selectedUsers.map((user: any) => user.id),
        })
        .then((res) => {
          const meet = res.data.meet
        })
        .catch((e) => {})
    }

    const clickCloseClick = () => {
      meetPageStore?.stopCreateMeet()
    }

    return {
      meetPageStore,
      clickCloseClick,
      setMeet,
      onCreateMeetBtnClick,
    }
  },
})
</script>
<style scoped lang="scss">
.meet-header {
  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 16px;
    cursor: pointer;
  }
}

.meet-body {
  position: absolute;
  left: 15px;
  top: 50px;
  &__text {
    margin-top: 20px;
    width: 540px;
  }
}

.meet-bottom {
  position: absolute;
  left: 15px;
  top: 380px;
  &__button {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #50bfff;
    height: 50px;
    width: 540px;
    padding: 0px 12px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    border: 1px solid #a4cef9;
  }
}
</style>
