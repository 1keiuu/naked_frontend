import { InjectionKey } from '@vue/composition-api'
import { TaskPageStore } from '~/store/Tasks/TaskPage'

const TaskPageStoreKey: InjectionKey<TaskPageStore> = Symbol('TaskPageStore')
export default TaskPageStoreKey
