// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function TaskPageStore() {
    const state = reactive({
        isDrawerOpen: false,
        isCreatingEpic: false,
        epic: <Epic>{},
        tasks: <Task[]>[]
    })
    
    return {
        get isDrawerOpen() {
            return state.isDrawerOpen
        },
        get isCreatingEpic() {
            return state.isCreatingEpic
        },
        get selectedEpic() {
            return state.epic
        },
        get selectedTasks() {
            return state.tasks
        },
        openDrawer() {
            state.isDrawerOpen = true
        },      
        closeDrawer() {
            state.isDrawerOpen = false
        },         
        startCreateEpic() {
            state.isCreatingEpic = true
        }, 
        stopCreateEpic() {
            state.isCreatingEpic = false
        },
        selectEpic(payload:object) {
            state.epic = payload
        },      
        selectTasks(payload:Array<Task>) {
            state.tasks = payload
        },
        reSetSelectedEpic() {
            state.epic = {}
        },
        reSetSelectedTasks() {
            state.tasks = []
        },    
  }
}

export type TaskPageStore = ReturnType<typeof TaskPageStore>;