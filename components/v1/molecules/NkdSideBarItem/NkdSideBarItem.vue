<template>
  <nuxt-link :to="item.to">
    <div
      class="nkd-sidebar__list-item hover:bg-gray-800 hover:bg-opacity-25 h-10 pl-4 py-3 flex items-center"
    >
      <NkdSideBarIcon :type="item.icon" color="grey"/>
      <p class="ml-3 text-white text-sm ">{{ item.title }}</p>
      <NkdSideBarIcon v-if="meetPageStore.isNotificationUnCheck && item.icon == 'meeting'" type="circle" class="circle-icon"/>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import NkdSideBarIcon from '../../atoms/NkdIcon/NkdIcon.vue'
import {
  defineComponent,
  PropType,
  ref,
  computed,
  inject,
} from '@vue/composition-api'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'

export default defineComponent({
  props: {
    item: Object as PropType<SideBarItem>,
  },
  components: {
    NkdSideBarIcon,
  },
  setup(props, context) {
    const meetPageStore = inject(MeetPageStoreKey)
    if (props.item?.icon == 'meeting') {
      context.root.$axios
        .get('/api/v1/notifications/notification_check')
        .then((res) => {
          meetPageStore?.setNotificationCheck(res.data.uncheck)
        })
        .catch((e) => {
          console.error(e)
        })
    }
    return {
      meetPageStore,
    }
  },
})
</script>

<style scoped lang="scss">
.circle-icon {
  // position: absolute;
  // padding-left: 1rem;
  // padding-top: 0rem;
  width: 10px;
  height: 10px;
  margin-left: 5px;
}
</style>
