<template>
  <div
    class="min-h-screen logIn-page px-8 sm:px-16 lg:px-32 xl:px-64 py-24 flex flex-col justify-center"
  >
    <NkdInviteForm @recieveClickEvent="onSubmitButtonClick" />
    <p
      class="text-red-500 text-center"
      v-for="(message, i) in errorMessages"
      :key="'error-message' + i"
    >
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from '@vue/composition-api'
import SignUpStoreKey from '../../storeKeys/SignUpStoreKey'
import NkdInviteForm from '../../organisms/NkdInviteForm/NkdInviteForm.vue'

export default defineComponent({
  components: {
    NkdInviteForm,
  },
  setup(_props, context) {
    const errorMessages = reactive<string[]>([])
    const SignUpStore = inject(SignUpStoreKey)

    if (!SignUpStore) {
      throw new Error(`${SignUpStoreKey} is not provided`)
    }
    // SignUpStore.setEmail(route.query.email)
    SignUpStore.setToken(context.root.$route.query.token)

    const onSubmitButtonClick = async () => {
      // context.root.$router.push('/login')
      errorMessages.splice(0, errorMessages.length)

      await context.root.$axios
        .post('/api/v1/users/invite_update', {
          user: {
            token: SignUpStore.token,
            password: SignUpStore.password,
            name: SignUpStore.userName,
          },
        })
        .then((response) => {
          context.root.$auth.setUser(response.data.user)
          context.root.$auth.setUserToken(response.data.user.token)
          context.root.$auth
            .loginWith('local', {
              data: {
                user: {
                  email: response.data.user.email,
                  password: SignUpStore.password,
                },
              },
            })
            .then((response) => {
              context.root.$auth.setUser(response.data.user)
              console.log(context.root.$auth.state.loggedIn)
            })
            .catch((error) => {
              console.log(error.response)
              if (!error.response.data.message) {
                errorMessages.push('新規登録に失敗しました')
                return
              }
              error.response.data.message.forEach((message: string) => {
                errorMessages.push(message)
              })
            })
        })
        .catch((error) => {
          console.log(error.response)
          if (!error.response.data.message) {
            errorMessages.push('新規登録に失敗しました')
            return
          }
          error.response.data.message.forEach((message: string) =>
            errorMessages.push(message)
          )
        })
    }

    return { errorMessages, onSubmitButtonClick }
  },
})
</script>
