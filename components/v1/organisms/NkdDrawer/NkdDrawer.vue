<template>
  <div
    class="nkd-drawer h-full bg-gray-100 border-l-2 border-gray-300 flex flex-col items-center fixed right-0 top-0 z-10"
    :class="{ '--active': isActive }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
<style scoped lang="scss">
.nkd-drawer {
  width: 0;
  transition: 0.5s;
  &.--active {
    width: 300px;
    transition: 0.5s;
  }
}
</style>
