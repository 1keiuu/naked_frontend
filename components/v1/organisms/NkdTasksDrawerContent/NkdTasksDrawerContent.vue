<template>
  <div class="w-full px-5">
    <NkdTextField :isOutLined="true" :value="epic.title" />

    <NkdTaskItemsList :epic="epic" :tasks="tasks" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdTextField from '@/components/v1/atoms/NkdTextField/NkdTextField.vue'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'

export default defineComponent({
  props: {
    epic: { type: Object as PropType<Epic> },
    tasks: { type: Array as PropType<Task[]> },
  },
  components: {
    NkdTextField,
    NkdTaskItemsList,
  },
})
</script>
