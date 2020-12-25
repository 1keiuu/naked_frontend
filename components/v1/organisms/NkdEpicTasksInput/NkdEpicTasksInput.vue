<template>
  <div class="epic-tasks__input" v-if="taskPageStore.isCreatingEpic">
    <input class="text-lg" @blur="onBlur" ref="inputRef" type="text" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  onMounted,
  watch,
} from '@vue/composition-api'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'

export default defineComponent({
  props: {},
  setup(props, context) {
    const inputRef = ref<HTMLInputElement>()

    const taskPageStore = inject(TaskPageStoreKey)
    watch(
      () => taskPageStore.isCreatingEpic,
      (newVal, oldVal) => {
        console.log(inputRef)
        setTimeout(() => {
          if (inputRef.value) {
            inputRef.value.focus()
          }
        }, 100)

        console.log(`${oldVal} -> ${newVal}`)
      }
    )

    const onBlur = () => {
      // taskPageStore.stopCreateEpic()
    }

    return { inputRef, taskPageStore, onBlur }
  },
})
</script>
