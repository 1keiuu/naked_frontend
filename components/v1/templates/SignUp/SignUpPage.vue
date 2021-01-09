<template>
  <div
    class="min-h-screen logIn-page px-8 sm:px-16 lg:px-32 xl:px-64 py-24 flex flex-col justify-center"
  >
    <NkdSignUpForm @recieveClickEvent="onSubmitButtonClick" />
    <a
      href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.avatar&client_id=1242468374582.1564775291025"
      ><img src="https://api.slack.com/img/sign_in_with_slack.png"
    /></a>
    <nuxt-link to="/login">アカウントをお持ちの方</nuxt-link>
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
import NkdSignUpForm from '../../organisms/NkdSignUpForm/NkdSignUpForm.vue'

export default defineComponent({
  components: {
    NkdSignUpForm,
  },
  setup(_props, context) {
    const errorMessages = reactive<string[]>([])
    const SignUpStore = inject(SignUpStoreKey)
    if (!SignUpStore) {
      throw new Error(`${SignUpStoreKey} is not provided`)
    }

    const onSubmitButtonClick = async () => {
      errorMessages.splice(0, errorMessages.length)

      await context.root.$axios
        .post('/api/v1/users/signup', {
          user: {
            email: SignUpStore.email,
            password: SignUpStore.password,
            name: 'user',
          },
        })
        .then((response) => {
          context.root.$auth.setUser(response.data.user)
          context.root.$auth.setUserToken(response.data.user.token)
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
