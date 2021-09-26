<template>
  <nav
    class="nkd-sidebar z-10 fixed left-0 bg-gray-700 w-56"
    :class="{ '--active': loggedIn }"
  >
    <nuxt-link to="/">
      <div class="nkd-sidebar__title-wrapper pb-8 pl-3 pt-5">
        <h3 class="nkd-sidebar__title text-white text-xl">Naked</h3>
      </div>
    </nuxt-link>
    <div class="nkd-sidebar__list-items w-56">
      <NkdSideBarItem
        v-for="(item, i) in listItems"
        :key="'item' + i"
        :item="item"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'
import NkdSideBarItem from '../../molecules/NkdSideBarItem/NkdSideBarItem.vue'

export default defineComponent({
  name: 'NkdSideBar',
  props: {
    loggedIn: {
      type: Boolean,
      requied: true,
    },
  },
  components: { NkdSideBarItem },
  setup(props, context) {
    const listItems = reactive<SideBarItem[]>([
      { title: 'ホーム', to: '/', icon: 'home' },
      { title: '1on1の記録•通知', to: '/meets/notification', icon: 'meeting' },
      { title: 'マイタスク', to: '/tasks', icon: 'task' },
      { title: '分析', to: '/graph', icon: 'graph' },
    ])
    return { listItems }
  },
})
</script>
<style scoped lang="scss">
.nkd-sidebar {
  display: none;
  height: inherit;
  &.--active {
    display: block;
  }
}
</style>
