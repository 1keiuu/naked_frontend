<template>
  <div
    class="nkd-drawer h-screen overflow-y-scroll bg-gray-100 border-l-2 border-gray-300 flex flex-col items-center fixed right-0 top-0 z-10"
    :class="{ '--active': isActive }"
    id="task-drawer"
  >
    <slot />
    {{isActive}}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    onMounted(() => {
      console.log(props.isActive)
    })
  },
})
</script>
<style scoped lang="scss">
.nkd-drawer {
  width: 0;
  transition: 0.5s;
  &.--active {
    width: 45vw;
    transition: 0.5s;
  }
}
</style>
