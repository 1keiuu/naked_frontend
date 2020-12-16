import { InjectionKey } from '@vue/composition-api';
import { LogInStore } from '~/store/LogIn/LogIn';

const LogInStoreKey: InjectionKey<LogInStore> = Symbol('LogInStore');
export default LogInStoreKey;
