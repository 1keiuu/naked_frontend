<template>
  <header
    class="tasks-drawer__header bg-white fixed top-0 pr-3 w-full border-gray-200 border-b-2 h-12 justify-end flex items-center"
    id="drawer-content"
  >
    <button @click="onClickEpicDeleteButton">削除</button>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  inject,
} from '@vue/composition-api'
import taskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
export default defineComponent({
  name: 'NkdTasksDrawerHeader',
  props: {},
  components: {},
  setup(_props, context) {
    const onClickEpicDeleteButton = () => {
      if (window.confirm('削除してもよろしいですか?')) {
        context.emit('onClickEpicDeleteButton')
      }
    }
    return { onClickEpicDeleteButton }
  },
})
</script>
<style scoped>
.tasks-drawer__header {
  width: 45vw;
}
</style>
