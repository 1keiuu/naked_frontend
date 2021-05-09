<template>
  <div>
    <div class="mb-1">
      {{startTime}}~{{finishTime}}
      <v-date-picker
        class="calendar"
        mode="datetime"
        @input="inputDate"
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
    const startTime = computed(() => {
      return moment(props.record?.starts_time).format('YYYY/MM/DD HH:mm')
    })
    const finishTime = computed(() => {
      return moment(props.record?.finish_time).format('HH:mm')
    })
    const inputDate = (event: any) => {
      console.log(event)
      // context.root.$axios
      //   .patch(`/api/v1/records/${props.record?.id}`, {
      //     starts_date: event.start + 1,
      //     due_date: event.end + 1,
      //   })
      //   .then((res) => {
      //     const record = res.data.record
      //     context.root.$router.go(0)
      //   })
      //   .catch((e) => {})
    }
    return { startTime, finishTime, inputDate }
  },
})
</script>
<style scoped lang="scss">
</style>
