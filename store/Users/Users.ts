import { reactive } from '@vue/composition-api'

export default function UsersStore() {
  const state = reactive({
    users: <User[]>[],
  })

  const replaceUser = (users: User[], user: User) => {
      let target = users.find(item => { return item.id === user.id })
      if (target) {
        let i = users.indexOf(target)
        users.splice(i,1,user)
      }
  }

  return {
    get users() {
      return state.users
    },
    setUsers(array:User[]) {
      state.users = array
    },
    updateUser(user: User) {
      replaceUser(state.users,user)
    },
    appendToUsers(payload: User) {
      state.users.unshift(payload)
    },
    deleteUsers(payload: Number) {
      const target = state.users.find((item:User) => {
        return item.id == payload
      })
      if (target) {
        const targetIndex = state.users.indexOf(target)
        state.users.splice(targetIndex, 1)
      }
    },
  }
}

export type UsersStore = ReturnType<typeof UsersStore>;
