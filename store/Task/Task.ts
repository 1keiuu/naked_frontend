import { reactive } from '@vue/composition-api'

export default function TaskStore() {
  const state = reactive({
  })

  return {
  }
}

export type TaskStore = ReturnType<typeof TaskStore>;