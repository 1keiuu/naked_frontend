<template>
  <header
    :class="{ '--active': loggedIn }"
    class="nkd-header fixed bg-white top-0 px-3 z-5 h-16 w-full items-center justify-end border-gray-300 border-b-2 z-10"
  >
    <input class="search" type="text" placeholder="ユーザーを検索してください"/>
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
  },
  setup(_props, context) {
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

    return { items, isItemListActive, signOut, onHeaderItemClick }
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
  font-size: 1.3em;
  font-family: Arial, sans-serif;
  color: #aaa;
  border: solid 1px #ccc;
  width: 300px;
  margin-right: auto;
  margin-left: 220px;
  background: #eee;
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
