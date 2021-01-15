// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function TaskPageStore() {
    const state = reactive({
        isDrawerOpen: false,
        isCreatingTask: false,
        isUpdatingTask: false,
        isCreatingSubTask:false,
        selectedTask: <Task>{},
        selectedSubTasks: <SubTask[]>[]
    })
    
    return {
        get isDrawerOpen() {
            return state.isDrawerOpen
        },
        get isCreatingTask() {
            return state.isCreatingTask
        },
        get isUpdatingTask() {
            return state.isUpdatingTask
        },
        get isCreatingSubTask() {
            return state.isCreatingTask
        },
        get selectedTask() {
            return state.selectedTask
        },
        get selectedSubTasks() {
            return state.selectedSubTasks
        },
        openDrawer() {
            state.isDrawerOpen = true
        },      
        closeDrawer() {
            state.isDrawerOpen = false
        },         
        startCreateTask() {
            state.isCreatingTask = true
        }, 
        stopCreateTask() {
            state.isCreatingTask = false
        },
        startUpdateTask() {
            state.isUpdatingTask = true
        }, 
        stopUpdateTask() {
            state.isUpdatingTask = false
        },
        startCreateSubTask() {
            state.isCreatingTask = true
        }, 
        stopCreateSubTask() {
            state.isCreatingTask = false
        },
        selectTask(payload:object) {
            state.selectedTask = payload
        },      
        selectTasks(payload:Array<SubTask>) {
            state.selectedSubTasks = payload
        },
        reSetSelectedTask() {
            state.selectedTask = {}
        },
        reSetSelectedTasks() {
            state.selectedSubTasks = []
        },
        appendSelectedTask(payload: SubTask) {
            state.selectedSubTasks.push(payload)
        },
        updateSelectedTask(payload: SubTask) {
            let target = state.selectedSubTasks.find(task => { return task.id == payload.id })
            target = payload
        },
  }
}

export type TaskPageStore = ReturnType<typeof TaskPageStore>;