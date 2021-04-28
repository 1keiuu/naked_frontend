import { InjectionKey } from '@vue/composition-api'
import { ReportPageStore } from '~/store/Reports/ReportPage'

const ReportPageStoreKey: InjectionKey<ReportPageStore> = Symbol('ReportPageStore')
export default ReportPageStoreKey
