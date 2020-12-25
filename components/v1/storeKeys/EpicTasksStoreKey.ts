import { InjectionKey } from '@vue/composition-api'
import { EpicTasksStore } from '~/store/EpicTasks/EpicTasks'

const EpicTasksStoreKey: InjectionKey<EpicTasksStore> = Symbol('EpicTasksStore')
export default EpicTasksStoreKey