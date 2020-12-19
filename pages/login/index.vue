<template>
  <LogInProvider>
    <LogInPage />
  </LogInProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import LogInProvider from '~/components/v1/providers/LogIn/LogInProvider.vue'
import LogInPage from '~/components/v1/templates/LogIn/LogInPage.vue'

export default defineComponent({
  auth: 'guest',
  components: {
    LogInProvider,
    LogInPage,
  },
})
</script>
