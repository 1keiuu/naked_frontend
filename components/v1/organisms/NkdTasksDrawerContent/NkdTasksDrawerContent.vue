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
      <h2>タスク一覧</h2>
      <NkdTaskItemsList :epic="epic" :tasks="tasks" />
      <button @click="onCreateTaskBtnClick">タスクを追加</button>
      <NkdDrawerTasksInput @onInputBlur="createTask" />
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
import NkdDrawerTasksInput from '@/components/v1/organisms/NkdDrawerTasksInput/NkdDrawerTasksInput.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'

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
    const taskPageStore = inject(TaskPageStoreKey)
    const epicTasksStore = inject(EpicTasksStoreKey)
    const onClickEpicDeleteButton = () => {
      context.emit('onClickEpicDeleteButton')
    }
    const onCreateTaskBtnClick = () => {
      taskPageStore.startCreateTask()
    }
    const createTask = (inputValue: string) => {
      taskPageStore.stopCreateTask()
      if (inputValue && props.epic) {
        context.root.$axios
          .post('/api/v1/tasks', {
            title: inputValue,
            epic_id: props.epic.id,
          })
          .then((res) => {
            if (!props.epic) return
            const task = res.data.task
            epicTasksStore.appendTask(task, props.epic.id)
          })
          .catch((e) => {})
      }
    }
    return {
      onClickEpicDeleteButton,
      onCreateTaskBtnClick,
      dispatchEvent,
      createTask,
    }
  },
})
</script>
