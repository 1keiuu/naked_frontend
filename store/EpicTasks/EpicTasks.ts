import { reactive } from '@vue/composition-api'

export default function EpicTasksStore() {
  const state = reactive({
    epicTasks: <EpicTasks[]>[],
    todayEpicTasks: <EpicTasks[]>[],
    tomorrowEpicTasks: <EpicTasks[]>[],
  })

  return {
    get epicTasks() {
      return state.epicTasks
    },
    get todayEpicTasks() {
      return state.todayEpicTasks
    },
    get tomorrowEpicTasks() {
      return state.tomorrowEpicTasks
    },

    setEpicTasks(array:EpicTasks[]) {
      state.epicTasks = array
    },
    appendEpicTasks(task: EpicTasks) {
      state.epicTasks.push(task)
    },
    deleteEpicTasks(id: Number) {
      const target = state.epicTasks.find((item:EpicTasks) => {
        return item.epic.id == id
      })
      if (target) {
        const targetIndex = state.epicTasks.indexOf(target)
        state.epicTasks.splice(targetIndex, 1)
      }
    },
    deleteTodayEpicTasks(id: Number) {
      const target = state.todayEpicTasks.find((item:EpicTasks) => {
        return item.epic.id == id
      })
      if (target) {
        const targetIndex = state.todayEpicTasks.indexOf(target)
        state.todayEpicTasks.splice(targetIndex, 1)
      }
    },
    deleteTomorrowEpicTasks(id: Number) {
      const target = state.tomorrowEpicTasks.find((item:EpicTasks) => {
        return item.epic.id == id
      })
      if (target) {
        const targetIndex = state.tomorrowEpicTasks.indexOf(target)
        state.tomorrowEpicTasks.splice(targetIndex, 1)
      }
    },
    setTodayEpicTasks(array:EpicTasks[]) {
      state.todayEpicTasks = array
    },
    setTomorrowEpicTasks(array:EpicTasks[]) {
      state.tomorrowEpicTasks = array
    },
  }
}

export type EpicTasksStore = ReturnType<typeof EpicTasksStore>;