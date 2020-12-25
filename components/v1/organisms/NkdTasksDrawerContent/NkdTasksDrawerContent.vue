<template>
  <div class="w-full px-5" id="drawer-content">
    <NkdTextField class="mt-5" :isOutLined="true" :value="epic.title" />
    <NkdTextArea class="mt-8" :isOutLined="true" :value="epic.description" />
    <NkdTaskItemsList :epic="epic" :tasks="tasks" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTextField from '@/components/v1/atoms/NkdTextField/NkdTextField.vue'
import NkdTextArea from '@/components/v1/atoms/NkdTextArea/NkdTextArea.vue'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
export default defineComponent({
  props: {
    epic: { type: Object as PropType<Epic> },
    tasks: { type: Array as PropType<Task[]> },
  },
  components: {
    NkdTextField,
    NkdTextArea,
    NkdTaskItemsList,
  },
  setup(props, context) {},
})
</script>
