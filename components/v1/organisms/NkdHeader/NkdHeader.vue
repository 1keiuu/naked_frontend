<template>
  <header
    :class="{ '--active': loggedIn }"
    class="nkd-header fixed bg-white top-0 px-3 z-5 h-16 w-full items-center justify-end border-gray-300 border-b-2"
  >
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      @click="isItemListActive = !isItemListActive"
      class="rounded-full h-12 mr-2 cursor-pointer"
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
    ])
    const isItemListActive = ref(false)
    const signOut = () => {
      context.root.$auth.logout()
    }

    const onHeaderItemClick = (type: string) => {
      switch (type) {
        case 'signOut':
          signOut()
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
