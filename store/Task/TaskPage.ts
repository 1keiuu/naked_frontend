// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function TaskPageStore() {
    const state = reactive({
        isDrawerOpen: false,
        epic: <Epic>{},
        tasks: <Task[]>[]
    })
    
    return {
        get isDrawerOpen() {
            return state.isDrawerOpen
        },
        get epic() {
            return state.epic
        },
        get tasks() {
            return state.tasks
        },
        openDrawer() {
            state.isDrawerOpen = true
        },      
        closeDrawer() {
            state.isDrawerOpen = false
        },     
        setEpic(payload:object) {
            state.epic = payload
        },      
        setTasks(payload:Array<Task>) {
            state.tasks = payload
        },    
        reSetEpic() {
            state.epic = {}
        },
        reSetTasks() {
            state.tasks = []
        },    
  }
}

export type TaskPageStore = ReturnType<typeof TaskPageStore>;