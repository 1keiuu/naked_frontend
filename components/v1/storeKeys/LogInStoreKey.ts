import { InjectionKey } from '~/store/SignUp/node_modules/@vue/composition-api';
import { LogInStore } from '~/store/LogIn/LogIn';

const LogInStoreKey: InjectionKey<LogInStore> = Symbol('LogInStore');
export default LogInStoreKey;
