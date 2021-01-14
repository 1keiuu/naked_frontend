<template>
  <div
    class="min-h-screen logIn-page px-8 sm:px-16 lg:px-32 xl:px-64 py-24 flex flex-col justify-center"
  >
    <NkdLogInForm @recieveClickEvent="onSubmitButtonClick" />
    <a
      v-if="env == 'production'"
      href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.avatar&client_id=1242468374582.1564775291025&request_uri=https://naked-api.herokuapp.com/api/v1/slack/auth"
      ><img src="https://api.slack.com/img/sign_in_with_slack.png" />
    </a>
    <a
      v-else-if="env == 'development'"
      href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic,identity.email,identity.avatar&client_id=1242468374582.1564775291025&request_uri=http://localhost:3000/api/v1/slack/auth"
      ><img src="https://api.slack.com/img/sign_in_with_slack.png" />
    </a>
    <nuxt-link to="/signup">新規登録</nuxt-link>
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
import { defineComponent, reactive, ref, inject } from '@vue/composition-api'
import NkdLogInForm from '../../organisms/NkdLogInForm/NkdLogInForm.vue'
import LogInStore from '~/store/LogIn/LogIn'
import LogInStoreKey from '../../storeKeys/LogInStoreKey'

export default defineComponent({
  components: {
    NkdLogInForm,
  },
  setup(_props, context) {
    const errorMessages = reactive<string[]>([])
    const LogInStore = inject(LogInStoreKey)
    if (!LogInStore) {
      throw new Error(`${LogInStoreKey} is not provided`)
    }

    const onSubmitButtonClick = async (e: Event) => {
      errorMessages.splice(0, errorMessages.length)
      await context.root.$auth
        .loginWith('local', {
          data: {
            user: { email: LogInStore.email, password: LogInStore.password },
          },
        })
        .then((response) => {
          context.root.$auth.setUser(response.data.user)
          context.root.$auth.setUserToken(response.data.user.token)
        })
        .catch((error) => {
          console.log(error.response)
          if (!error.response.data.message) {
            errorMessages.push('ログインに失敗しました')
            return
          }
          error.response.data.message.forEach((message: string) => {
            errorMessages.push(message)
          })
        })
    }

    const env = process.env.NODE_ENV
    console.log(env)
    return { errorMessages, onSubmitButtonClick, env }
  },
})
</script>
