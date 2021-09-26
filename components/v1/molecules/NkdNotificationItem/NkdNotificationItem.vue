<template>
  <div>
    <!-- idのnotification-cardを変えるときは注意 -->
    <div id="notification-card" class="notification-card">
      <div class="notification-card__user">
        <img
          :src="notification.active_user.avatar_url"
          v-if="notification.active_user.avatar_url"
          id="avatar"
          class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
        />
        <img
        src="~/assets/images/avatar.jpg"
        v-else
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover mb-2"
        />
        <div>
          {{ notification.active_user.name }}さんから申し込みが来ています
        </div>
        <div class="notification-card__time">
          {{ offerTime }}
        </div>
      </div>
      <div class="notification-card__inner">
        <div id="notification-card">コメント:  {{ notification.meet.description }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  Ref,
  computed,
} from '@vue/composition-api'
import moment from 'moment'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'

export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    notification: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  setup(props, context) {
    const date = ref(new Date())
    const record_time: Ref<string> = ref('')
    const offerTime = computed(() => {
      return moment(props.notification?.meet.offer_sent_at).format('YYYY/MM/DD')
    })

    return { offerTime }
  },
})
</script>
<style scoped lang="scss">
.notification-card {
  justify-content: space-between;
  position: relative;
  // background: #fff;
  padding: 8px 12px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  width: 95%;
  &__user {
    display: flex;
    align-items: center;
  }
  &__time {
    margin-left: 15px;
    color: gray;
    font-size: 13px;
  }
  &__inner {
    flex: 1;
    white-space: pre-line;
    font-size: 20px;
  }

  // .notification-card:hover {
  //   background: #f1f4f7;
  // }
}
</style>
