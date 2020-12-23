import { InjectionKey } from '@vue/composition-api'
import { TaskStore } from '~/store/Task/Task'

const TaskStoreKey: InjectionKey<TaskStore> = Symbol('TaskStore')
export default TaskStoreKey