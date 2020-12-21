import { InjectionKey } from '@vue/composition-api'
import { TaskPageStore } from '@/store/Task/TaskPage'

const TaskPageStoreKey: InjectionKey<TaskPageStore> = Symbol('TaskPageStore')
export default TaskPageStoreKey