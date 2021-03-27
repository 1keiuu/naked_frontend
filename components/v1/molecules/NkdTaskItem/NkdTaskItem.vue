<template>
  <div>
    <div id="task-card" class="task-card" @click="onCardClick">
      <div class="task-card__inner">
        <h3 class="text-lg">{{ task.title }}</h3>
      </div>
      <div v-if="task.starts_date == task.due_date" class="date__wrapper">
        <p class="starts-date">{{ task.starts_date }}</p>
      </div>
      <div v-else-if="task.starts_date || task.due_date" class="date__wrapper">
        <p class="starts-date">{{ task.starts_date }} ~</p>
        <p class="due-date">{{ task.due_date }}</p>
      </div>
      <button @click="createRecord" class="open-play__button">
        <NkdIcon type="play" color="grey" />
      </button>
      <button @click="openCalender" class="open-calendar__button">
        <NkdIcon type="calendar" color="grey" />
      </button>
      <p class="ml-2 task-card__time">{{record_time}}</p>
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
import {
  defineComponent,
  PropType,
  inject,
  ref,
  watch,
} from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
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
    const record_time = ref(Number)
    const taskPageStore = inject(TaskPageStoreKey)
    const isCalenderOpen = ref(false)
    const selectedDate = ref({ start: String, end: String })
    const tasksStore = inject(TasksStoreKey)

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
      taskPageStore.selectTask(props.task)
      taskPageStore.selectSubTasks(props.task?.sub_tasks)
      taskPageStore.openDrawer()
    }
    watch(selectedDate, (date) => {
      isCalenderOpen.value = false
      const data = {
        id: props.task?.id,
        starts_date: date.start,
        due_date: date.end,
      }
      context.emit('updateTaskDate', data)
    })

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
      if (tasksStore.currentTask.id !== null)
        context.root.$axios
          .patch(`/api/v1/records/${tasksStore.currentTask.record.id}`, {
            task_id: props.task?.id,
            user_id: context.root.$auth.user.id,
          })
          .then((res) => {
            const record = res.data.record
          })
          .catch((e) => {})

      context.root.$axios
        .post('/api/v1/tasks/record_update', {
          id: props.task?.id,
        })
        .then((res) => {
          const record = res.data.record
        })
        .catch((e) => {})
      context.root.$axios
        .post('/api/v1/records', {
          task_id: props.task?.id,
          user_id: context.root.$auth.user.id,
        })
        .then((res) => {
          const record = res.data.record
        })
        .catch((e) => {})
    }

    const inputDate = (event: any) => {
      console.log(event)
      context.root.$axios
        .patch(`/api/v1/tasks/${props.task?.id}`, {
          starts_date: event.start,
          due_date: event.end,
        })
        .then((res) => {
          const record = res.data.record
        })
        .catch((e) => {})
    }

    context.root.$axios
      .post('/api/v1/records/time', {
        task_id: props.task?.id,
      })
      .then((res) => {
        record_time.value = res.data.record_time
      })
      .catch((e) => {})

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
