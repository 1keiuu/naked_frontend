// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function TaskPageStore() {
    const state = reactive({
        drawerStatus: false,
        epic: <Epic>{},
        tasks: <Task[]>[]
    })
    
    return {
        get drawerStatus() {
            return state.drawerStatus
        },
        get epic() {
            return state.epic
        },
        get tasks() {
            return state.tasks
        },
        setdrawerStatus(payload:boolean) {
            state.drawerStatus = payload
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