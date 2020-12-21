<template>
  <SignUpProvider>
    <SignUpPage />
  </SignUpProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SignUpProvider from '~/components/v1/providers/SignUp/SignUpProvider.vue'
import SignUpPage from '~/components/v1/templates/SignUp/SignUpPage.vue'

export default defineComponent({
  auth: 'guest',
  components: {
    SignUpProvider,
    SignUpPage,
  },
})
</script>
