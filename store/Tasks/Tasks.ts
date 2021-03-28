import { reactive } from '@vue/composition-api'

export default function TasksStore() {
  const state = reactive({
    tasks: <Task[]>[],
    todayTasks: <Task[]>[],
    tomorrowTasks: <Task[]>[],
    noDateTasks: <Task[]>[],
    currentTask: <Task>{}
  })

  const replaceTask = (tasks: Task[], task: Task) => {
      let target = tasks.find(item => { return item.id === task.id })
      if (target) {
        let i = tasks.indexOf(target)
        tasks.splice(i,1,task)
      }
  }

  return {
    get tasks() {
      return state.tasks
    },
    get todayTasks() {
      return state.todayTasks
    },
    get tomorrowTasks() {
      return state.tomorrowTasks
    },
    get noDateTasks() {
      return state.noDateTasks
    },
    get currentTask() {
      return state.currentTask
    },
    setTasks(array:Task[]) {
      state.tasks = array
    },
    appendTask(task: Task) {
      state.tasks.push(task)
    },
    updateTask(task: Task) {
      replaceTask(state.todayTasks,task)
      replaceTask(state.tomorrowTasks,task)
      replaceTask(state.noDateTasks,task)
    },
    // today
    setTodayTasks(array:Task[]) {
      state.todayTasks = array
    },
    deleteTodayTasks(payload: Number) {
      const target = state.todayTasks.find((item:Task) => {
        return item.id == payload
      })
      if (target) {
        const targetIndex = state.todayTasks.indexOf(target)
        state.todayTasks.splice(targetIndex, 1)
      }
    },
    // tomorrow
    setTomorrowTasks(array:Task[]) {
      state.tomorrowTasks = array
    },
    deleteTomorrowTasks(payload: Number) {
      const target = state.tomorrowTasks.find((item:Task) => {
        return item.id == payload
      })
      if (target) {
        const targetIndex = state.tomorrowTasks.indexOf(target)
        state.tomorrowTasks.splice(targetIndex, 1)
      }
    },
    // noDate
    setNoDateTasks(array:Task[]) {
      state.noDateTasks = array
    },
    appendToNoDateTask(payload: Task) {
      state.noDateTasks.push(payload)
    },
    deleteNoDateTasks(payload: Number) {
      const target = state.noDateTasks.find((item:Task) => {
        return item.id == payload
      })
      if (target) {
        const targetIndex = state.noDateTasks.indexOf(target)
        state.noDateTasks.splice(targetIndex, 1)
      }
    },
    //current
    setCurrentTask(object:Task) {
      state.currentTask = object
    },
  }
}

export type TasksStore = ReturnType<typeof TasksStore>;
