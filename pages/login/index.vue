<template>
  <LogInProvider>
    <LogInPage />
  </LogInProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LogInProvider from '~/components/v1/providers/LogIn/LogInProvider.vue'
import LogInPage from '~/components/v1/templates/LogIn/LogInPage.vue'
import auth from '@/middleware/auth'

export default defineComponent({
  auth: 'guest',
  middleware: [auth],
  components: {
    LogInProvider,
    LogInPage,
  },
})
</script>
