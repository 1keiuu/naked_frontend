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
      <button @click="openCalender" class="open-calendar__button">
        <NkdIcon type="calendar" color="grey" />
      </button>
      <v-date-picker
        v-if="isCalenderOpen"
        class="calendar"
        mode="date"
        is-range
        v-model="selectedDate"
        v-click-outside="clickCalendarOutside"
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
export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    task: {
      type: Object as PropType<Task>,
    },
  },
  setup(props, context) {
    const taskPageStore = inject(TaskPageStoreKey)
    const isCalenderOpen = ref(false)
    const selectedDate = ref({ start: String, end: String })
    const onCardClick = () => {
      const isDrawerOpen = taskPageStore.isDrawerOpen
      if (isDrawerOpen) {
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

    return {
      onCardClick,
      openCalender,
      isCalenderOpen,
      clickCalendarOutside,
      selectedDate,
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
  .date__wrapper {
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
}
.task-card:hover {
  background: #f1f4f7;
}
</style>
