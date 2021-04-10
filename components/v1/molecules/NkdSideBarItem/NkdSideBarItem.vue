<template>
  <nuxt-link :to="item.to">
    <div
      class="nkd-sidebar__list-item hover:bg-gray-800 hover:bg-opacity-25 h-10 pl-4 py-3 flex items-center"
    >
      <NkdSideBarIcon :type="item.icon" color="grey"/>
      <p class="ml-3 text-white text-sm">{{ item.title }}</p>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import NkdSideBarIcon from '../../atoms/NkdIcon/NkdIcon.vue'
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    item: Object as PropType<SideBarItem>,
  },
  components: {
    NkdSideBarIcon,
  },
})
</script>
