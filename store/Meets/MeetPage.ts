// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function meetPageStore() {
    const state = reactive({
        isCreatingMeet: false,
        isUpdatingMeet: false,
        selectedUsers: <User[]>[],
    })
    
    return {
        get selectedUsers() {
            return state.selectedUsers
        },
        setSelectUsers(palyload: Array<User>) {
            state.selectedUsers = palyload
        },
        appendToSelectedUsers(payload: any) {
          state.selectedUsers.push(payload)
        },
        deleteSelectedUsers(payload: Number) {
          const target = state.selectedUsers.find((item:Task) => {
            return item.id == payload
          })
          if (target) {
            const targetIndex = state.selectedUsers.indexOf(target)
            state.selectedUsers.splice(targetIndex, 1)
          }
        },
        // レポートの作成/更新中のフラグ
        get isCreatingMeet() {
            return state.isCreatingMeet
        },
        get isUpdatingMeet() {
            return state.isUpdatingMeet
        },
        startCreateMeet() {
            state.isCreatingMeet = true
        }, 
        stopCreateMeet() {
            state.isCreatingMeet = false
        },
        startUpdateMeet() {
            state.isUpdatingMeet = true
        }, 
        stopUpdateMeet() {
            state.isUpdatingMeet = false
        },
  }
}

export type MeetPageStore = ReturnType<typeof meetPageStore>;
