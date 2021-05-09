<template>
  <div>
    <div class="mb-1">
      {{startTime}}~{{finishTime}}
      <v-date-picker
        class="calendar"
        mode="datetime"
        v-model="selectedDateTime"
        @input="inputDateTime"
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
    const selectedDateTime = ref({ start: String, end: String })
    selectedDateTime.value = {
      start: props.record?.starts_time,
      end: props.record?.finish_time,
    }

    const startTime = computed(() => {
      return moment(props.record?.starts_time).format('YYYY/MM/DD HH:mm')
    })
    const finishTime = computed(() => {
      return moment(props.record?.finish_time).format('HH:mm')
    })
    const inputDateTime = (event: any) => {
      console.log(event)
      context.root.$axios
        .patch(`/api/v1/records/${props.record?.id}`, {
          starts_date: event.start,
          due_date: event.end,
        })
        .then((res) => {
          const record = res.data.record
          context.root.$router.go(0)
        })
        .catch((e) => {})
    }
    return { startTime, finishTime, inputDateTime, selectedDateTime }
  },
})
</script>
<style scoped lang="scss">
</style>
