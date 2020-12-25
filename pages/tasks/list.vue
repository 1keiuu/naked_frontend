<template>
  <div class="task-page w-full h-full">
    <TasksProvider>
      <TasksPage />
    </TasksProvider>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive } from '@vue/composition-api'
import TasksProvider from '@/components/v1/providers/Tasks/TasksProvider.vue'
import TasksPage from '@/components/v1/templates/Tasks/TasksPage.vue'
export default defineComponent({
  components: { TasksProvider, TasksPage },
  setup(_props, context) {},
})
</script>
