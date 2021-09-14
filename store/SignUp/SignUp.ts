import { reactive } from '@vue/composition-api'

export default function SignUpStore() {
  const state = reactive({
      email: '',
      password: '',
      userName: '',
      companyName: ''
  })

  return {
    get email() {
      return state.email
    },
    get password() {
      return state.password
    },
    get userName() {
      return state.userName
    },
    get companyName() {
      return state.companyName
    },
    setEmail(payload:string) {
      state.email = payload
    },
    setPassword(payload:string) {
      state.password = payload
    },
    setUserName(payload:string) {
      state.userName = payload
    },
    setCompanyName(payload:string) {
      state.companyName = payload
    },
    reSetEmail() {
      state.email = ''
    },
    reSetPassword() {
      state.password = ''
    },
    reSetUserName() {
      state.userName = ''
    },
    reSetCompanyName() {
      state.companyName = ''
    },
  }
}

export type SignUpStore = ReturnType<typeof SignUpStore>;
