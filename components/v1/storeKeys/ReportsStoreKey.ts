import { InjectionKey } from '@vue/composition-api'
import { ReportsStore } from '~/store/Reports/Reports'

const ReportsStoreKey: InjectionKey<ReportsStore> = Symbol('ReportsStore')
export default ReportsStoreKey
