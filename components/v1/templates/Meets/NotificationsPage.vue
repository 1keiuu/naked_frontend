<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
      <NkdNotificationsList
        :notifications="notifications"
      />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  PropType,
  onMounted,
  inject,
} from '@vue/composition-api'
import NkdNotificationsList from '../../organisms/NkdNotificationsList/NkdNotificationsList.vue'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'

export default defineComponent({
  props: {},
  components: { NkdNotificationsList },
  setup(props, context) {
    // const taskPageStore = inject(TaskPageStoreKey)
    const notifications = ref()
    const meetPageStore = inject(MeetPageStoreKey)

    context.root.$axios
      .get('/api/v1/notifications')
      .then((res) => {
        notifications.value = res.data.notifications
        meetPageStore?.setNotificationCheck(false)
      })
      .catch((e) => {
        console.error(e)
      })

    return { notifications }
  },
})
</script>

<style scoped lang="scss">
</style>
