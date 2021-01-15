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
        // SelectedTask 選択中のタスク
        get selectedTask() {
            return state.selectedTask
        },
        selectTask(payload:object) {
            state.selectedTask = payload
        },    
        reSetSelectedTask() {
            state.selectedTask = {}
        },
        // SelectedSubTask 選択中のサブタスク
        get selectedSubTasks() {
            return state.selectedSubTasks
        },
        selectSubTasks(payload:Array<SubTask>) {
            state.selectedSubTasks = payload
        },
        reSetSelectedTasks() {
            state.selectedSubTasks = []
        },
        appendToSelectedSubTasks(payload: SubTask) {
            state.selectedSubTasks.push(payload)
        },
        updateSelectedSubTask(payload: SubTask) {
            let target = state.selectedSubTasks.find(task => { return task.id == payload.id })
            target = payload
        },
        // Drawerの状態
        get isDrawerOpen() {
            return state.isDrawerOpen
        },
        openDrawer() {
            state.isDrawerOpen = true
        },      
        closeDrawer() {
            state.isDrawerOpen = false
        },         
        // タスクの作成/更新中のフラグ
        get isCreatingTask() {
            return state.isCreatingTask
        },
        get isUpdatingTask() {
            return state.isUpdatingTask
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
        // サブタスクの作成/更新中のフラグ
        get isCreatingSubTask() {
            return state.isCreatingTask
        },
        startCreateSubTask() {
            state.isCreatingTask = true
        }, 
        stopCreateSubTask() {
            state.isCreatingTask = false
        },
  }
}

export type TaskPageStore = ReturnType<typeof TaskPageStore>;