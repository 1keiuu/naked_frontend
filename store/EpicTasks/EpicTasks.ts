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
    },
    deleteEpicTasks(id: Number) {
      const target = state.epicTasks.find((item:EpicTasks) => {
        item.epic.id == id
      })
      if (target) {
        const targetIndex = state.epicTasks.indexOf(target)
        state.epicTasks.splice(targetIndex, 1)
      }
    }
  }
}

export type EpicTasksStore = ReturnType<typeof EpicTasksStore>;