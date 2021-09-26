<template>
  <div class="task-page w-full h-full">
    <NotificationsHeader
    />
    <NotificationsPage/>
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
import NotificationsPage from '@/components/v1/templates/Meets/NotificationsPage.vue'
import NotificationsHeader from '@/components/v1/templates/Meets/MeetsHeader.vue'

export default defineComponent({
  props: {},
  components: {
    NotificationsPage,
    NotificationsHeader,
  },
  setup(props, context) {},
})
</script>

<style scoped lang="scss">
</style>
