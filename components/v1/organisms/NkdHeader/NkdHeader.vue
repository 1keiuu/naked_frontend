<template>
  <header
    :class="{ '--active': loggedIn }"
    class="nkd-header fixed bg-white top-0 px-3 z-5 h-16 w-full items-center justify-end border-gray-300 border-b-2 z-10"
  >
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

    const x = 1

    const onHeaderItemClick = (type: string) => {
      switch (type) {
        case 'signOut':
          signOut()
          break
        case 'show':
          context.root.$router.push(`/users/${x}`)
          console.log(x)
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
</style>
