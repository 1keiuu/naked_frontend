<template>
  <div v-if="userPageStore.isUpdatingUser">
    <div class="user-header" @click="clickCloseClick">
      <NkdIcon type="close" color="black" class="user-header__close"/>
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
  props: {},
  setup(props, context) {
    const userPageStore = inject(UserPageStoreKey)
    const usersStore = inject(UsersStoreKey)
    const tasksStore = inject(TasksStoreKey)
    const userDescription = ref()

    const setUser = (inputValue: string) => {
      userDescription.value = inputValue
    }

    const onCreateUserBtnClick = () => {
      userPageStore?.stopCreateUser()

      context.root.$axios
        .post('/api/v1/users', {
          description: userDescription.value,
          user_id: context.root.$auth.user.id,
          task_ids: tasksStore.todayTasks.map((task: any) => task.id),
        })
        .then((res) => {
          const user = res.data.user
          usersStore.appendToUsers(user)
        })
        .catch((e) => {})
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
      userPageStore?.stopCreateUser()
    }

    return {
      userPageStore,
      clickCloseClick,
      tasksStore,
      setUser,
      onCreateUserBtnClick,
    }
  },
})
</script>
<style scoped lang="scss">
.user-header {
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
  &__text {
    margin-top: 20px;
  }
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
