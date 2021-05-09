<template>
  <div class="w-full h-full pt-12 task-drawer" ref="task-drawer">
    <NkdTasksDrawerHeader @onClickEpicDeleteButton="onClickEpicDeleteButton" />
    <div class="px-5 pt-2">
      <NkdLabel name="task-title" value="タスク名" />
      <NkdTextField
        :isOutLined="true"
        :value="task.title"
        name="task-title"
        @onTextFieldInput="onTextFieldInput"
        @onTextFieldBlur="onTextFieldBlur"
      />
      <NkdLabel name="task-description" value="タスクの説明" class="mt-8" />
      <NkdTextArea
        :isOutLined="true"
        :value="task.description"
        name="task-description"
        @onTextAreaInput="onTextAreaInput"
        @onTextAreaBlur="onTextAreaBlur"
      />
      <NkdRecordItemsList
        :records="task.records"
      />
      <NkdDrawerTasksInput @onInputBlur="createSubTask" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject, ref } from '@vue/composition-api'
import NkdTextField from '@/components/v1/atoms/NkdTextField/NkdTextField.vue'
import NkdTextArea from '@/components/v1/atoms/NkdTextArea/NkdTextArea.vue'
import NkdLabel from '@/components/v1/atoms/NkdLabel/NkdLabel.vue'
import NkdSubTaskItemsList from '@/components/v1/organisms/NkdSubTaskItemsList/NkdSubTaskItemsList.vue'
import NkdTasksDrawerHeader from '@/components/v1/organisms/NkdTasksDrawerHeader/NkdTasksDrawerHeader.vue'
import NkdRecordItemsList from '~/components/v1/organisms/NkdRecordItemsList/NkdRecordItemsList.vue'
import NkdDrawerTasksInput from '@/components/v1/organisms/NkdDrawerTasksInput/NkdDrawerTasksInput.vue'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import EpicTasksStoreKey from '@/components/v1/storeKeys/EpicTasksStoreKey'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'

export default defineComponent({
  props: {
    task: { type: Object as PropType<Task> },
    subTasks: { type: Array as PropType<SubTask[]> },
  },
  components: {
    NkdTextField,
    NkdTextArea,
    NkdSubTaskItemsList,
    NkdTasksDrawerHeader,
    NkdRecordItemsList,
  },
  setup(props, context) {
    const taskPageStore = inject(TaskPageStoreKey)
    const tasksStore = inject(TasksStoreKey)
    const taskTasksStore = inject(EpicTasksStoreKey)
    const onClickEpicDeleteButton = () => {
      context.emit('onClickEpicDeleteButton')
    }
    const onCreateSubTaskBtnClick = () => {
      taskPageStore.startCreateSubTask()
    }
    const createSubTask = (inputValue: string) => {
      taskPageStore.startCreateSubTask()
      if (inputValue && props.task) {
        context.root.$axios
          .post('/api/v1/sub_tasks', {
            title: inputValue,
            task_id: props.task.id,
          })
          .then((res) => {
            if (!props.task) return
            const subTask = res.data.sub_task
            taskPageStore.appendToSelectedSubTasks(subTask)
          })
          .catch((e) => {})
      }
    }
    const updateTaskTitle = (obj: Task) => {
      if (!props.task || !obj.title) return
      if (obj.title.length > 20)
        return alert('タイトルは20文字以内で入力してください')
      const target = taskPageStore.selectedTask
      // 変更ない場合は弾く
      if (!target || obj.title == target.title) return
      updateTask({ id: obj.id, title: obj.title })
    }
    const updateTask = (obj: Task) => {
      context.root.$axios
        .patch(`/api/v1/tasks/${obj.id}`, obj)
        .then((res) => {
          const task = res.data.task
          tasksStore.updateTask(task)
        })
        .catch((e) => {
          console.log(e.response.message)
        })
    }
    const updateSubTask = (obj: Object) => {
      taskPageStore.stopCreateTask()
      if (props.task) {
        context.root.$axios
          .patch(`/api/v1/sub_tasks/${props.task.id}`, obj)
          .then((res) => {
            if (!props.task) return
            const task = res.data.task
            taskTasksStore.updateTask({
              id: task.id,
              title: task.title,
              description: task.description,
            })
            taskPageStore.selectTask({
              id: task.id,
              title: task.title,
              description: task.description,
            })
          })
          .catch((e) => {})
      }
    }

    const onTextFieldBlur = (inputValue: string) => {
      taskPageStore.stopUpdateTask()
      if (taskPageStore.selectedTask.title !== inputValue && props.task)
        updateTask({
          id: props.task.id,
          title: inputValue,
        })
    }
    const onTextAreaBlur = (inputValue: string) => {
      taskPageStore.stopUpdateTask()
      if (taskPageStore.selectedTask.description !== inputValue && props.task)
        updateTask({
          id: props.task.id,
          description: inputValue,
        })
    }
    const onTextFieldInput = () => {
      taskPageStore.startUpdateTask()
    }
    const onTextAreaInput = () => {
      taskPageStore.startUpdateTask()
    }
    return {
      onClickEpicDeleteButton,
      onCreateSubTaskBtnClick,
      dispatchEvent,
      createSubTask,
      onTextFieldInput,
      onTextAreaInput,
      onTextFieldBlur,
      onTextAreaBlur,
      updateTaskTitle,
    }
  },
})
</script>
<style scoped lang="scss">
.task-drawer::after {
  content: '';
  height: 80px;
  display: block;
}
</style>
