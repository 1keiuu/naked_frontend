<template>
  <header
    :class="{ '--active': loggedIn }"
    class="nkd-header fixed bg-white top-0 px-3 z-5 h-16 w-full items-center justify-end border-gray-300 border-b-2 z-10"
  >
    <div class="search">
      <input class="search__input" type="text" placeholder="ユーザーを検索してください" @keyup.enter="trigger" v-model="state.username"/>

      <div class="search__icon h-10">
        <NkdIcon type="search" color="#666"/>
      </div>
    </div>
    <NkdHeaderTask
      v-if="tasksStore.currentTask !== null"
      :task="tasksStore.currentTask"
    />
    <img
      :src="avatarUrl"
      v-if="avatarUrl"
      id="avatar"
      @click="isItemListActive = !isItemListActive"
      class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
    />
    <img
      src="~/assets/images/avatar.jpg"
      v-else
      id="avatar"
      @click="isItemListActive = !isItemListActive"
      class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
    />
    <HeaderItemList
      :isItemListActive="isItemListActive"
      :items="items"
      @dispatchAction="onHeaderItemClick"
    />
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  inject,
  provide,
  computed,
  PropType,
} from '@vue/composition-api'
import HeaderItemList from '@/components/v1/organisms/NkdHeaderItemList/NkdHeaderItemList.vue'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import NkdHeaderTask from '../../molecules/NkdHeaderTask/NkdHeaderTask.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import UsersStoreKey from '@/components/v1/storeKeys/UsersStoreKey'

export default defineComponent({
  name: 'NkdHeader',
  props: {
    loggedIn: {
      type: Boolean,
      requied: true,
    },
    // avatarUrl: {
    //   type: String,
    //   required: false,
    // },
  },
  components: {
    HeaderItemList,
    NkdIcon,
    NkdHeaderTask,
  },

  setup(props, context) {
    const state = reactive({
      username: '',
    })

    const avatarUrl = ref()

    const tasksStore = inject(TasksStoreKey)
    const usersStore = inject(UsersStoreKey)

    if (props.loggedIn) {
      avatarUrl.value =
        context.root.$auth.user.avatar == null
          ? ref(context.root.$auth.user.avatar_url)
          : ref(context.root.$auth.user.avatar)
    }

    tasksStore.setCurrentTask(null)

    context.root.$axios
      .get('/api/v1/tasks')
      .then((res) => {
        if (res.data.current.id !== null)
          tasksStore.setCurrentTask(res.data.current)
        else return
      })
      .catch((e) => {
        console.error(e)
      })
    const user = ref([])
    const trigger = (event: any) => {
      if (event.keyCode !== 13) return
      context.root.$router.push(`/users/search?username=${state.username}`)
      const query = ref(state.username)
      context.root.$axios
        .post('api/v1/users/search', {
          q: query.value,
        })
        .then((res) => {
          usersStore.setUsers(res.data)
        })
        .catch((e) => {
          console.error(e)
        })

      context.root.$router.go(1)
    }
    const items = reactive<HeaderItem[]>([
      {
        title: 'ログアウト',
        type: 'signOut',
      },
      {
        title: '詳細ページ',
        type: 'show',
      },
    ])

    const isItemListActive = ref(false)
    const signOut = () => {
      context.root.$auth.logout()
    }

    window.addEventListener('click', (e) => {
      const arr = ['avatar', 'header-item']
      if (!arr.includes((e.target as HTMLElement).id)) {
        isItemListActive.value = false
      }
    })

    const onHeaderItemClick = (type: string) => {
      switch (type) {
        case 'signOut':
          signOut()
          break
        case 'show':
          if (context.root.$auth.loggedIn) {
            const user_id = context.root.$auth.user.id
            context.root.$router.push(`/users/${user_id}`)
            isItemListActive.value = false
          }
          break
      }
    }

    return {
      items,
      isItemListActive,
      signOut,
      onHeaderItemClick,
      state,
      trigger,
      user,
      tasksStore,
      avatarUrl,
    }
  },
})
</script>
<style scoped lang="scss">
.nkd-header {
  display: none;
  &.--active {
    display: flex;
  }
}

.search {
  &__input {
    padding: 0 10px;
    position: absolute;
    width: 300px;
    left: 230px;
    top: 0;
    border-radius: 2px;
    outline: 0;
    background: #eee;
    height: 35px;
    margin-top: 15px;
  }
  &__icon {
    height: 25px;
    position: absolute;
    left: 490px;
    top: 20px;
    background: none;
    color: #666;
    border: none;
    font-size: 20px;
  }
}
</style>
