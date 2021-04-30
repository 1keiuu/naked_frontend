<template>
  <div>
    <div id="task-card" class="task-card mr-2">
      <div class="task-card__inner">
        <h3 class="text-lg">{{ task.title }}</h3>
      </div>
      <div class="task-card__table">
        <div class="task-card__table__time">
          {{ hours }} :
          {{ minutes}} :
          {{ seconds}}
        </div>
        <button @click="updateRecord" class="open-play__button">
          <NkdIcon type="stop" color="grey" />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  computed,
  watch,
} from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import RecordsStoreKey from '@/components/v1/storeKeys/RecordsStoreKey'

export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    task: {
      type: Object,
    },
  },
  setup(props, context) {
    const date = ref(new Date())
    const taskPageStore = inject(TaskPageStoreKey)
    const isCalenderOpen = ref(false)
    const selectedDate = ref({ start: String, end: String })
    const animateFrame = ref(0)
    const nowTime = ref(0)
    const diffTime = ref(0)
    const startTime = ref(0)
    const isRunning = ref(false)
    const tasksStore = inject(TasksStoreKey)
    const recordsStore = inject(RecordsStoreKey)

    const setSubtractStartTime = (time: number) => {
      var time = typeof time !== 'undefined' ? time : 0
      startTime.value = Math.floor(performance.now() - time)
    }

    const startTimer = () => {
      isRunning.value = true
      setSubtractStartTime(diffTime.value)
      ;(function loop() {
        nowTime.value = Math.floor(performance.now())
        // nowTime.value = Math.floor(props?.task?.record_time)
        const recordTime =
          props?.task?.record_time == null
            ? ref(1)
            : ref(props?.task?.record_time)

        diffTime.value =
          Math.floor(recordTime.value * 1000) + nowTime.value - startTime.value
        animateFrame.value = requestAnimationFrame(loop)
      })()
    }

    const stopTimer = () => {
      cancelAnimationFrame(animateFrame.value)
    }

    const updateRecord = () => {
      const recordId =
        props?.task?.record?.id == null
          ? ref(recordsStore?.record.id)
          : ref(props?.task?.record?.id)

      context.root.$axios
        .patch(`/api/v1/records/${recordId.value}`, {
          task_id: props.task?.id,
          user_id: context.root.$auth.user.id,
        })
        .then((res) => {
          const record = res.data.record
          tasksStore.setCurrentTask(null)
          recordsStore?.setRecord(null)
          context.root.$router.go(0)
        })
        .catch((e) => {})
    }
    const hours = computed(() => {
      return Math.floor(diffTime.value / 1000 / 60 / 60)
        .toString()
        .padStart(2, '0')
    })
    const minutes = computed(() => {
      return (Math.floor(diffTime.value / 1000 / 60) % 60)
        .toString()
        .padStart(2, '0')
    })
    // 秒数を計算 (60秒になったら0秒に戻る)
    const seconds = computed(() => {
      return (Math.floor(diffTime.value / 1000) % 60)
        .toString()
        .padStart(2, '0')
    })

    startTimer()

    return {
      selectedDate,
      date,
      updateRecord,
      startTimer,
      stopTimer,
      hours,
      minutes,
      seconds,
    }
  },
})
</script>
<style scoped lang="scss">
.task-card {
  background-color: #f5f4f4;
  display: flex;
  overflow: hidden;
  padding: 0 8px;
  width: auto;
  &__inner {
    padding: 9px;
  }
  .open-play__button {
    height: 45px;
    width: 45px;
    padding: 10px;
    margin: 0 0 0 auto;
  }
  &__table {
    // padding: 10px;
    display: flex;
    padding: 0 10px;
    border-left: 1px solid #c9ccce;
    &__time {
      padding: 11px;
    }
  }
}
.task-card:hover {
  background: #dfe2e6;
}
</style>
