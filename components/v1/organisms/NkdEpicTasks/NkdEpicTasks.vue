<template>
  <div id="epic-tasks__card" class="epic-tasks__card" @click="onCardClick">
    <div class="epic-tasks__inner">
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
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  watch,
} from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
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
    subTasks: {
      type: Array as PropType<SubTask[]>,
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
.epic-tasks__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .open-calendar__button {
    height: 40px;
    width: 40px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid grey;
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
  }
}
</style>
