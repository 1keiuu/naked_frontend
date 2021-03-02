<template>
  <header
    :class="{ '--active': loggedIn }"
    class="nkd-header fixed bg-white top-0 px-3 z-5 h-16 w-full items-center justify-end border-gray-300 border-b-2 z-10"
  >
    <input class="search" type="text" placeholder="ユーザーを検索してください" @keyup.enter="trigger" v-model="state.username"/>
    {{state.username}}
    <div class="search-icon h-10">
      <NkdIcon type="search" />
    </div>
    <!-- <input id="sbox2" name="s" type="text" placeholder="フリーワードを入力"/> -->
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
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import HeaderItemList from '@/components/v1/organisms/NkdHeaderItemList/NkdHeaderItemList.vue'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'

export default defineComponent({
  name: 'NkdHeader',
  props: {
    loggedIn: {
      type: Boolean,
      requied: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  components: {
    HeaderItemList,
    NkdIcon,
  },
  setup(_props, context) {
    const state = reactive({
      username: '',
      user: '',
    })
    // const user = ref({})
    const trigger = (event: any) => {
      // if (event.keyCode !== 13) return
      console.log(`${state.username}`)
      context.root.$axios
        .post('api/v1/users/followings', {
          q: state.username,
        })
        .then((res) => {
          state.user = res.data.user
        })
        .catch((e) => {
          console.error(e)
        })
      // 実行したい処理
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
  border: 0;
  font-size: 1.1em;
  font-family: Arial, sans-serif;
  color: #aaa;
  border: solid 1px #ccc;
  width: 300px;
  margin-right: auto;
  margin-left: 220px;
  background: #eee;
}

.search-icon {
  margin-right: auto;
  margin-left: 300px;
}
// #sbox2 {

//   height: 50px;
//   /* padding: 0 10px; */
//   /* position: absolute; */
//   /* left: 0; */
//   /* top: 0; */
//   border-radius: 2px;
//   outline: 0;
//   background: #eee;
// }
</style>
