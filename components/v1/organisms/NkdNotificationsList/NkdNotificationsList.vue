<template>
  <div>
    <NkdNotificationItem
      v-for="task in tasks"
      :key="'task' + task.id"
      :task="task"
      :type="type"
      @onInputBlur="dispatchEvent"
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
    tasks: {
      type: Array,
    },
  },
  setup(_props, context) {
    return {}
  },
})
</script>
<style scoped></style>
