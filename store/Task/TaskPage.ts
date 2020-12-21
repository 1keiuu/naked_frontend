// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function TaskPageStore() {
    const state = reactive({
      sideBarStatus: false
    })
    

    return {
        get sideBarStatus() {
            return state.sideBarStatus
          },
          setSideBarStatus(payload:boolean) {
            state.sideBarStatus = payload
          },      
  }
}

export type TaskPageStore = ReturnType<typeof TaskPageStore>;