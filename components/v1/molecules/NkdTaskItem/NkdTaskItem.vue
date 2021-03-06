<template>
  <div>
    <!-- idのtask-cardを変えるときは注意 -->
    <div id="task-card" class="task-card" @click="onCardClick">
      <div class="task-card__inner">
        <h3 class="text-lg" id="task-card">{{ task.title }}</h3>
      </div>
      <div v-if="task.starts_date == task.due_date" class="date__wrapper">
        <p class="starts-date" id="task-card">{{ task.starts_date }}</p>
      </div>
      <div v-else-if="task.starts_date || task.due_date" class="date__wrapper">
        <p class="starts-date" id="task-card">{{ task.starts_date }} ~</p>
        <p class="due-date" id="task-card">{{ task.due_date }}</p>
      </div>
      <button @click="createRecord" class="open-play__button">
        <NkdIcon type="play" color="grey" />
      </button>
      <button @click="openCalender" class="open-calendar__button">
        <NkdIcon type="calendar" color="grey" />
      </button>
      <p class="ml-2 task-card__time">{{ record_time }}</p>
      <v-date-picker
        v-if="isCalenderOpen"
        class="calendar"
        mode="date"
        is-range
        v-model="selectedDate"
        v-click-outside="clickCalendarOutside"
        @input="inputDate"
      />
    </div>
    <NkdSubTaskItemsList :subTasks="task.sub_tasks" />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, Ref } from '@vue/composition-api'
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
    type: {
      type: String,
    },
  },
  setup(props, context) {
    const date = ref(new Date())
    const record_time: Ref<string> = ref('')
    const taskPageStore = inject(TaskPageStoreKey)
    const isCalenderOpen = ref(false)
    const selectedDate: Ref<{ start: String; end: String }> = ref({
      start: '',
      end: '',
    })
    const tasksStore = inject(TasksStoreKey)
    const recordsStore = inject(RecordsStoreKey)

    const onCardClick = () => {
      const isDrawerOpen = taskPageStore.isDrawerOpen
      if (isDrawerOpen) {
        taskPageStore.closeDrawer()
        return
      }
      if (isCalenderOpen.value == true) {
        taskPageStore.closeDrawer()
        return
      }
      taskPageStore.openDrawer()
      taskPageStore.selectTask(props.task)
      taskPageStore.selectSubTasks(props.task?.sub_tasks)
    }
    selectedDate.value = {
      start: props.task?.starts_date,
      end: props.task?.due_date,
    }

    // watch(selectedDate, (date) => {
    //   isCalenderOpen.value = false
    //   const data = {
    //     id: props.task?.id,
    //     starts_date: date.start,
    //     due_date: date.end,
    //   }
    //   context.emit('updateTaskDate', data)
    // })

    const openCalender = () => {
      isCalenderOpen.value = true
    }
    const closeCalender = () => {
      isCalenderOpen.value = false
    }

    const clickCalendarOutside = () => {
      closeCalender()
    }

    const createRecord = () => {
      const recordId =
        props?.task?.record?.id == null
          ? ref(recordsStore?.record.id)
          : ref(props?.task?.record?.id)
      //curretTaskがある場合そのTaskを停止させる必要がある
      if (tasksStore.currentTask !== null)
        context.root.$axios
          .patch(`/api/v1/records/${recordId.value}`, {
            user_id: context.root.$auth.user.id,
          })
          .then((res) => {
            const record = res.data.record
            tasksStore.setCurrentTask(null)
            recordsStore?.setRecord(null)
            context.root.$router.go(0)
          })
          .catch((e) => {})

      context.root.$axios
        .post('/api/v1/tasks/record_update', {
          id: props.task?.id,
        })
        .then((res) => {
          const task = res.data.task
        })
        .catch((e) => {})
      context.root.$axios
        .post('/api/v1/records', {
          task_id: props.task?.id,
          user_id: context.root.$auth.user.id,
        })
        .then((res) => {
          const task = res.data.current_task
          const record = res.data.record
          tasksStore.setCurrentTask(task)
          recordsStore.setRecord(record)

          // context.root.$router.go(0)
        })
        .catch((e) => {})
    }

    const inputDate = (event: any) => {
      context.root.$axios
        .patch(`/api/v1/tasks/${props.task?.id}`, {
          starts_date: event.start + 1,
          due_date: event.end + 1,
        })
        .then((res) => {
          const record = res.data.record
          context.root.$router.go(0)
        })
        .catch((e) => {})
    }

    if (props.type == 'list') {
      context.root.$axios
        .post('/api/v1/records/time', {
          task_id: props.task?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    } else if (props.type == 'index') {
      context.root.$axios
        .post('/api/v1/records/today_time', {
          task_id: props.task?.id,
        })
        .then((res) => {
          record_time.value = res.data.record_time
        })
        .catch((e) => {})
    }

    return {
      onCardClick,
      openCalender,
      isCalenderOpen,
      clickCalendarOutside,
      selectedDate,
      date,
      createRecord,
      record_time,
      inputDate,
    }
  },
})
</script>
<style scoped lang="scss">
.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  // background: #fff;
  padding: 8px 12px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  width: 95%;
  &__inner {
    flex: 1;
  }

  .open-calendar__button {
    pointer-events: none;
    opacity: 0;
    height: 40px;
    width: 40px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid grey;
  }
  &:hover {
    .open-calendar__button {
      opacity: 1;
      pointer-events: unset;
    }
  }
  .open-play__button {
    opacity: 0;
    height: 45px;
    width: 45px;
    padding: 10px;
    margin: 0 0 0 auto;
  }
  &:hover {
    .open-play__button {
      opacity: 1;
      pointer-events: unset;
    }
  }
  .date__wrapper {
    margin-left: 100px;
    flex: 2;
    .starts-date,
    .due-date {
      color: grey;
      font-size: 13px;
    }
  }
  .calendar {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 5;
    height: 320px;
  }
  &__time {
    color: gray;
    font-size: 13px;
    width: 30px;
  }
}
.task-card:hover {
  background: #f1f4f7;
}
</style>
