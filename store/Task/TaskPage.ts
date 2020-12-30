// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function TaskPageStore() {
    const state = reactive({
        isDrawerOpen: false,
        isCreatingEpic: false,
        isUpdatingEpic: false,
        isCreatingTask:false,
        selectedEpic: <Epic>{},
        selectedTasks: <Task[]>[]
    })
    
    return {
        get isDrawerOpen() {
            return state.isDrawerOpen
        },
        get isCreatingEpic() {
            return state.isCreatingEpic
        },
        get isUpdatingEpic() {
            return state.isUpdatingEpic
        },
        get isCreatingTask() {
            return state.isCreatingTask
        },
        get selectedEpic() {
            return state.selectedEpic
        },
        get selectedTasks() {
            return state.selectedTasks
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
        startUpdateEpic() {
            state.isUpdatingEpic = true
        }, 
        stopUpdateEpic() {
            state.isUpdatingEpic = false
        },
        startCreateTask() {
            state.isCreatingTask = true
        }, 
        stopCreateTask() {
            state.isCreatingTask = false
        },
        selectEpic(payload:object) {
            state.selectedEpic = payload
        },      
        selectTasks(payload:Array<Task>) {
            state.selectedTasks = payload
        },
        reSetSelectedEpic() {
            state.selectedEpic = {}
        },
        reSetSelectedTasks() {
            state.selectedTasks = []
        },
        appendSelectedTask(payload: Task) {
            state.selectedTasks.push(payload)
        },
  }
}

export type TaskPageStore = ReturnType<typeof TaskPageStore>;