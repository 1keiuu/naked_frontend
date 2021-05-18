import { InjectionKey } from '@vue/composition-api'
import { UserPageStore } from '~/store/Users/UserPage'

const UserPageStoreKey: InjectionKey<UserPageStore> = Symbol('UserPageStore')
export default UserPageStoreKey
