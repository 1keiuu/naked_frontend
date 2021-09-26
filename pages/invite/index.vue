<template>
  <SignUpProvider>
    <InvitePage />
  </SignUpProvider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SignUpProvider from '~/components/v1/providers/SignUp/SignUpProvider.vue'
import InvitePage from '~/components/v1/templates/SignUp/InvitePage.vue'

export default defineComponent({
  auth: 'guest',
  components: {
    SignUpProvider,
    InvitePage,
  },
})
</script>
