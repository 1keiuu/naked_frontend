<template>
  <div
    class="h-full w-64 bg-gray-100 border-l-2 border-gray-300 fixed right-0 top-0 pt-20"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
