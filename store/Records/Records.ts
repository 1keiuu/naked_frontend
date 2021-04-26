import { reactive } from '@vue/composition-api'

export default function RecordsStore() {
  const state = reactive({
    record: <TaskRecord>{},
  })

  return {
    get record() {
      return state.record
    },
    setRecord(object:TaskRecord) {
      state.record = object
    },
  }
}

export type RecordsStore = ReturnType<typeof RecordsStore>;
