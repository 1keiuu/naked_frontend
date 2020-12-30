import { reactive } from '@vue/composition-api'

export default function EpicTasksStore() {
  const state = reactive({
    epicTasks: <EpicTasks[]>[],
    todayEpicTasks: <EpicTasks[]>[],
    tomorrowEpicTasks: <EpicTasks[]>[],
    noDateEpicTasks: <EpicTasks[]>[],
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
    get noDateEpicTasks() {
      return state.noDateEpicTasks
    },
    setEpicTasks(array:EpicTasks[]) {
      state.epicTasks = array
    },
    appendEpicTasks(epicTasks: EpicTasks) {
      state.epicTasks.push(epicTasks)
    },
    appendTask(task: Task, epic_id: number) {
      const target = state.epicTasks.find(epictasks => {return epictasks.epic.id == epic_id })
      target?.tasks.push(task)
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
    // today
    setTodayEpicTasks(array:EpicTasks[]) {
      state.todayEpicTasks = array
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
    // tomorrow
    setTomorrowEpicTasks(array:EpicTasks[]) {
      state.tomorrowEpicTasks = array
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
    // noDate
    setNoDateEpicTasks(array:EpicTasks[]) {
      state.noDateEpicTasks = array
    },
    deleteNoDateEpicTasks(id: Number) {
      const target = state.noDateEpicTasks.find((item:EpicTasks) => {
        return item.epic.id == id
      })
      if (target) {
        const targetIndex = state.noDateEpicTasks.indexOf(target)
        state.noDateEpicTasks.splice(targetIndex, 1)
      }
    },
  }
}

export type EpicTasksStore = ReturnType<typeof EpicTasksStore>;