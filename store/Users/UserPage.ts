// pageの状態に関するstate
import { reactive } from '@vue/composition-api'

export default function userPageStore() {
    const state = reactive({
        isCreatingUser: false,
        isUpdatingUser: false,
        selectedUser: <User>{},
        currentUser: <User>{},
    })
    
    return {
        get selectedUser() {
            return state.selectedUser
        },
        get currentUser() {
            return state.currentUser
        },
        selectUser(payload:any) {
            state.selectedUser = payload
        },
        setCurrentUser(payload:any) {
            state.currentUser = payload
        },
        // レポートの作成/更新中のフラグ
        get isCreatingUser() {
            return state.isCreatingUser
        },
        get isUpdatingUser() {
            return state.isUpdatingUser
        },
        startCreateUser() {
            state.isCreatingUser = true
        }, 
        stopCreateUser() {
            state.isCreatingUser = false
        },
        startUpdateUser() {
            state.isUpdatingUser = true
        }, 
        stopUpdateUser() {
            state.isUpdatingUser = false
        },
  }
}

export type UserPageStore = ReturnType<typeof userPageStore>;
