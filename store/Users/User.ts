import { reactive } from '@vue/composition-api'

export default function UserStore() {
  const state = reactive({
    user: <User>{}
  })

  return {
    get selectedUser() {
      return state.user
    }
  }
}
