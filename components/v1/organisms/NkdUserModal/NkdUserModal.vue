<template>
  <div v-if="userPageStore.isUpdatingUser">
    <div class="user-header" @click="clickCloseClick">
      <div class="user-header__profile">プロフィールの編集</div>
      <NkdIcon type="close" color="black" class="user-header__close"/>
    </div>
    <div class="user-body">
      <img :src="userPageStore.selectedUser.avatar_url" v-if="userPageStore.selectedUser.avatar_url" class="rounded-full mr-2 cursor-pointer object-cover user-body__image">
      <img src="~/assets/images/avatar.jpg" v-else class="rounded-full mr-2 cursor-pointer object-cover user-body__image">
      <div class="user-body__file"><input type="file" ref="preview" @change="uploadFile">ファイルを添付する</div>
    </div>
    <div class="user-card">
      <NkdLabel name="user-name" value="名前" />
      <NkdTextField
        :isOutLined="true"
        :value="userPageStore.selectedUser.name"
        name="user-name"
        @onTextFieldBlur="onTextFieldBlur"
      />
    </div>
    <div class="user-bottom">
      <button class="user-bottom__button" @click="onEditUserBtnClick">
        <p>完了</p>
      </button>
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
import UserPageStoreKey from '@/components/v1/storeKeys/UserPageStoreKey'
import UsersStoreKey from '@/components/v1/storeKeys/UsersStoreKey'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'

export default defineComponent({
  components: {},
  props: {
    user: {
      type: Object as PropType<User>,
    },
  },
  setup(props, context) {
    const userPageStore = inject(UserPageStoreKey)
    const usersStore = inject(UsersStoreKey)
    const tasksStore = inject(TasksStoreKey)
    const userDescription = ref()
    const preview = ref()
    const file = ref()

    const setUser = (inputValue: string) => {
      userDescription.value = inputValue
    }

    const onEditUserBtnClick = () => {
      userPageStore?.stopUpdateUser()
      // console.log()

      // context.root.$axios
      //   .post('/api/v1/users', {
      //     description: userDescription.value,
      //     user_id: context.root.$auth.user.id,
      //     task_ids: tasksStore.todayTasks.map((task: any) => task.id),
      //   })
      //   .then((res) => {
      //     const user = res.data.user
      //     usersStore.appendToUsers(user)
      //   })
      //   .catch((e) => {})
    }

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        tasksStore.setTodayTasks(res.data.today.slice(0, 4))
      })
      .catch((e) => {
        console.error(e)
      })

    const clickCloseClick = () => {
      userPageStore?.stopUpdateUser()
    }

    const uploadFile = () => {
      const target = userPageStore?.selectedUser
      if (!target) return
      file.value = preview.value.files[0]
      target.avatar_url = URL.createObjectURL(file.value)
      preview.value = ''
    }

    const onTextFieldBlur = (inputValue: string) => {
      if (userPageStore?.selectedUser.name !== inputValue && props.user)
        updateUserName({
          id: props.user.id,
          name: inputValue,
        })
    }

    const updateUserName = (obj: User) => {
      if (!props.user || !obj.name) return
      if (obj.name.length > 20)
        return alert('タイトルは20文字以内で入力してください')
      const target = userPageStore?.selectedUser
      // 変更ない場合は弾く
      if (!target || obj.name == target.name) return
      target.name = obj.name
    }

    return {
      userPageStore,
      clickCloseClick,
      tasksStore,
      setUser,
      onEditUserBtnClick,
      preview,
      file,
      uploadFile,
      onTextFieldBlur,
    }
  },
})
</script>
<style scoped lang="scss">
.user-header {
  &__profile {
    position: absolute;
    top: 15px;
    left: 230px;
  }
  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 16px;
    cursor: pointer;
  }
}

.user-body {
  position: absolute;
  left: 15px;
  top: 50px;
  display: flex;
  &__text {
    margin-top: 20px;
  }
  &__image {
    height: 150px;
    width: 150px;
  }
  &__file {
    display: inline-block;
    position: absolute;
    left: 180px;
    top: 105px;
    background: #757171;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    padding: 10px 18px;
    border-radius: 4px;
    transition: all 0.3s;
    height: 45px;
    width: 200px;
  }
  &__file:hover {
    background: #888;
    transition: all 0.4s;
  }
  &__file input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}

.user-card {
  position: absolute;
  left: 15px;
  top: 250px;
}

.user-bottom {
  position: absolute;
  left: 15px;
  top: 530px;
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
