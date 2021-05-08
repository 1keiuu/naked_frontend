import { reactive } from '@vue/composition-api'

export default function SignUpStore() {
  const state = reactive({
      email: '',
      password: '',
      name: ''
  })

  return {
    get email() {
      return state.email
    },
    get password() {
      return state.password
    },
    get name() {
      return state.name
    },
    setEmail(payload:string) {
      state.email = payload
    },
    setPassword(payload:string) {
      state.password = payload
    },
    setName(payload:string) {
      state.name = payload
    },
    reSetEmail() {
      state.email = ''
    },
    reSetPassword() {
      state.password = ''
    },
    reSetName() {
      state.name = ''
    },
  }
}

export type SignUpStore = ReturnType<typeof SignUpStore>;
