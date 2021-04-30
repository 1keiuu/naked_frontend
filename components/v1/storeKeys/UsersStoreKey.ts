import { InjectionKey } from '@vue/composition-api'
import { UsersStore } from '~/store/Users/Users'

const UsersStoreKey: InjectionKey<UsersStore> = Symbol('UsersStore')
export default UsersStoreKey
