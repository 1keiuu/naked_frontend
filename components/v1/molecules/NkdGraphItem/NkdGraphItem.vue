<template>
  <div>
    <!-- idのtask-cardを変えるときは注意 -->
      <div class="task-card__inner">
        <h3 class="text-lg" id="task-card">{{ task.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  watch,
  computed,
} from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    task: {
      type: Object,
    },
  },
  setup(props, context) {
    return {}
  },
})
</script>
<style scoped lang="scss">
</style>
