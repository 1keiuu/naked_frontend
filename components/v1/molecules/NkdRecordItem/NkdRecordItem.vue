<template>
  <div>
    <div class="mb-3">
      <div class="record-time">
        <div class="mr-3">{{startTime}}~{{finishTime}}</div>
        <button @click="openRecord" class="open-play__button">
          編集
        </button>
      </div>

      <v-date-picker
        v-if="isRecordOpen"
        class="calendar"
        mode="datetime"
        v-model="selectedDateTime"
        @input="inputDateTime"
        v-click-outside="clickCalendarOutside"
        is-range
      />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  watch,
  computed,
} from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import moment from 'moment'
export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    record: {
      type: Object,
    },
  },
  setup(props, context) {
    const isRecordOpen = ref(false)
    const selectedDateTime = ref({ start: String, end: String })
    selectedDateTime.value = {
      start: props.record?.starts_time,
      end: props.record?.finish_time,
    }

    const openRecord = () => {
      isRecordOpen.value = true
    }

    const closeRecord = () => {
      isRecordOpen.value = false
    }

    const clickCalendarOutside = () => {
      closeRecord()
      context.root.$router.go(0)
    }

    const startTime = computed(() => {
      return moment(props.record?.starts_time).format('YYYY/MM/DD HH:mm')
    })
    const finishTime = computed(() => {
      return moment(props.record?.finish_time).format('HH:mm')
    })
    const inputDateTime = (event: any) => {
      context.root.$axios
        .patch(`/api/v1/records/${props.record?.id}`, {
          starts_time: event.start,
          finish_time: event.end,
        })
        .then((res) => {
          const record = res.data.record
        })
        .catch((e) => {})
    }
    return {
      startTime,
      finishTime,
      inputDateTime,
      selectedDateTime,
      openRecord,
      isRecordOpen,
      clickCalendarOutside,
    }
  },
})
</script>
<style scoped lang="scss">
.record-time {
  display: flex;
  padding: 8px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid #efefef;
}
.calendar {
  position: absolute;
  left: 100px;
  z-index: 5;
}
</style>
