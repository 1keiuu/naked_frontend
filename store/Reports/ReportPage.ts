// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function reportPageStore() {
    const state = reactive({
        isCreatingReport: false,
        isUpdatingReport: false,
        selectedReport: <Report>{},
    })
    
    return {
        get selectedReport() {
            return state.selectedReport
        },
        selectReport(payload:any) {
            state.selectedReport = payload
        },
        // レポートの作成/更新中のフラグ
        get isCreatingReport() {
            return state.isCreatingReport
        },
        get isUpdatingReport() {
            return state.isUpdatingReport
        },
        startCreateReport() {
            state.isCreatingReport = true
        }, 
        stopCreateReport() {
            state.isCreatingReport = false
        },
        startUpdateReport() {
            state.isUpdatingReport = true
        }, 
        stopUpdateReport() {
            state.isUpdatingReport = false
        },
  }
}

export type ReportPageStore = ReturnType<typeof reportPageStore>;
