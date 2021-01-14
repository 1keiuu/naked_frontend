import { InjectionKey } from '@vue/composition-api'
import { TasksStore } from '~/store/Tasks/Tasks'

const TasksStoreKey: InjectionKey<TasksStore> = Symbol('TasksStore')
export default TasksStoreKey