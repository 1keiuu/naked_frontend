<template>
  <div class="min-h-screen logIn-page pt-16 flex flex-col justify-center">
    <NkdTaskSubHeader />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from '@vue/composition-api'
import NkdTaskSubHeader from '@/components/v1/organisms/NkdTasksSubHeader/NkdTasksSubHeader.vue'
export default defineComponent({
  components: {
    NkdTaskSubHeader,
  },
})
</script>
