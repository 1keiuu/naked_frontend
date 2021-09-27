// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function meetPageStore() {
    const state = reactive({
        isCreatingMeet: false,
        isUpdatingMeet: false,
        isUpdatingTarget: false,
        selectedTarget: <Target>{},
        selectedUsers: <User[]>[],
        isNotificationUnCheck: false
    })
    
    return {
        get selectedUsers() {
            return state.selectedUsers
        },
        get selectedTarget() {
            return state.selectedTarget
        },
        setNotificationCheck(payload:any) {
            state.isNotificationUnCheck = payload
        },
        setSelectUsers(palyload: Array<User>) {
            state.selectedUsers = palyload
        },
        setSelectTarget(payload: any) {
            state.selectedTarget = payload
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
        get isUpdatingTarget() {
            return state.isUpdatingTarget
        },
        get isNotificationUnCheck() {
            return state.isNotificationUnCheck
        },
        checkNotification() {
            state.isNotificationUnCheck = false
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
        startUpdateTarget() {
            state.isUpdatingTarget = true
        }, 
        stopUpdateTarget() {
            state.isUpdatingTarget = false
        },
  }
}

export type MeetPageStore = ReturnType<typeof meetPageStore>;
