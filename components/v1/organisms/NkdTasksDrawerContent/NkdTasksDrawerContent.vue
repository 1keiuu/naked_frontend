<template>
  <div class="w-full h-full pt-12" id="drawer-content">
    <NkdTasksDrawerHeader @onClickEpicDeleteButton="onClickEpicDeleteButton" />
    <div class="px-5 pt-2" id="drawer-content">
      <NkdLabel name="epic-title" value="エピック名" />
      <NkdTextField :isOutLined="true" :value="epic.title" name="epic-title" />
      <NkdLabel name="epic-description" value="エピックの説明" class="mt-8" />
      <NkdTextArea
        :isOutLined="true"
        :value="epic.description"
        name="epic-description"
      />
      <NkdTaskItemsList :epic="epic" :tasks="tasks" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from '@vue/composition-api'
import NkdTextField from '@/components/v1/atoms/NkdTextField/NkdTextField.vue'
import NkdTextArea from '@/components/v1/atoms/NkdTextArea/NkdTextArea.vue'
import NkdLabel from '@/components/v1/atoms/NkdLabel/NkdLabel.vue'
import NkdTaskItemsList from '@/components/v1/molecules/NkdTaskItemsList/NkdTaskItemsList.vue'
import NkdTasksDrawerHeader from '@/components/v1/organisms/NkdTasksDrawerHeader/NkdTasksDrawerHeader.vue'
export default defineComponent({
  props: {
    epic: { type: Object as PropType<Epic> },
    tasks: { type: Array as PropType<Task[]> },
  },
  components: {
    NkdTextField,
    NkdTextArea,
    NkdTaskItemsList,
    NkdTasksDrawerHeader,
  },
  setup(props, context) {
    const onClickEpicDeleteButton = () => {
      context.emit('onClickEpicDeleteButton')
    }
    return { onClickEpicDeleteButton }
  },
})
</script>
