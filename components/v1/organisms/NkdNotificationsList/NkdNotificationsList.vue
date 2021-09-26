<template>
  <div>
    <NkdNotificationItem
      v-for="notification in notifications"
      :key="'notification' + notification.id"
      :notification="notification"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdNotificationItem from '../../molecules/NkdNotificationItem/NkdNotificationItem.vue'

export default defineComponent({
  components: {
    NkdNotificationItem,
  },
  props: {
    notifications: {
      type: Array,
    },
  },
  setup(_props, context) {
    return {}
  },
})
</script>
<style scoped></style>
