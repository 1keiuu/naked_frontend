import { reactive } from '@vue/composition-api'

export default function EpicTasksStore() {
  const state = reactive({
    epicTasks:<EpicTasks[]>[]
  })

  return {
    get epicTasks() {
      return state.epicTasks
    },
    setEpicTasks(array:EpicTasks[]) {
      state.epicTasks = array
    },
    appendEpicTasks(task: EpicTasks) {
      state.epicTasks.push(task)
    }
  }
}

export type EpicTasksStore = ReturnType<typeof EpicTasksStore>;