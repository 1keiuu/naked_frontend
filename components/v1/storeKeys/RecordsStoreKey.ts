import { InjectionKey } from '@vue/composition-api'
import { RecordsStore } from '~/store/Records/Records'

const RecordsStoreKey: InjectionKey<RecordsStore> = Symbol('RecordsStore')
export default RecordsStoreKey
