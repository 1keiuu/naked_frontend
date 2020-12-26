import { reactive } from '@vue/composition-api'

export default function TaskStore() {
  const state = reactive({
    tasks: <Task[]>[],
    todayTasks: <Task[]>[],
    tomorrowTasks: <Task[]>[],
  })

  return {
    get tasks() {
      return state.tasks
    },
    setTasks(array:Task[]) {
      state.tasks = array
    },
    appendTask(task: Task) {
      state.tasks.push(task)
    }
  }
}

export type TaskStore = ReturnType<typeof TaskStore>;