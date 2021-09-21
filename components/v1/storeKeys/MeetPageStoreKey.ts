import { InjectionKey } from '@vue/composition-api'
import { MeetPageStore } from '~/store/Meets/MeetPage'

const MeetPageStoreKey: InjectionKey<MeetPageStore> = Symbol('MeetPageStore')
export default MeetPageStoreKey
