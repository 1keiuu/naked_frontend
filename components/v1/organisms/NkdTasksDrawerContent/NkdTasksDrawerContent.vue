<template>
  <div class="w-full h-full pt-12 overflow-y-hidden">
    <NkdTasksDrawerHeader @onClickEpicDeleteButton="onClickEpicDeleteButton" />
    <div class="px-5 pt-2">
      <NkdLabel name="epic-title" value="エピック名" />
      <NkdTextField
        :isOutLined="true"
        :value="epic.title"
        name="epic-title"
        @onTextFieldInput="onTextFieldInput"
        @onTextFieldBlur="onTextFieldBlur"
      />
      <NkdLabel name="epic-description" value="エピックの説明" class="mt-8" />
      <NkdTextArea
        :isOutLined="true"
        :value="epic.description"
        name="epic-description"
        @onTextAreaInput="onTextAreaInput"
        @onTextAreaBlur="onTextAreaBlur"
      />
      <NkdTaskItemsList
        :epic="epic"
        :tasks="tasks"
        @onCreateTaskBtnClick="onCreateTaskBtnClick"
      />
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
            taskPageStore.appendSelectedTask(task)
          })
          .catch((e) => {})
      }
    }
    const updateEpic = (obj: Object) => {
      taskPageStore.stopCreateTask()
      if (props.epic) {
        context.root.$axios
          .patch(`/api/v1/epics/${props.epic.id}`, obj)
          .then((res) => {
            if (!props.epic) return
            const epic = res.data.epic
            epicTasksStore.updateEpic({
              id: epic.id,
              title: epic.title,
              description: epic.description,
            })
            taskPageStore.selectEpic({
              id: epic.id,
              title: epic.title,
              description: epic.description,
            })
          })
          .catch((e) => {})
      }
    }
    const onTextFieldBlur = (inputValue: string) => {
      taskPageStore.stopUpdateEpic()
      if (taskPageStore.selectedEpic.title !== inputValue)
        updateEpic({
          title: inputValue,
        })
    }
    const onTextAreaBlur = (inputValue: string) => {
      taskPageStore.stopUpdateEpic()
      if (taskPageStore.selectedEpic.description !== inputValue)
        updateEpic({
          description: inputValue,
        })
    }
    const onTextFieldInput = () => {
      taskPageStore.startUpdateEpic()
    }
    const onTextAreaInput = () => {
      taskPageStore.startUpdateEpic()
    }
    return {
      onClickEpicDeleteButton,
      onCreateTaskBtnClick,
      dispatchEvent,
      createTask,
      onTextFieldInput,
      onTextAreaInput,
      onTextFieldBlur,
      onTextAreaBlur,
    }
  },
})
</script>
