import { InjectionKey } from '~/store/SignUp/node_modules/@vue/composition-api';
import { SignUpStore } from '~/store/SignUp/SignUp';

const SignUpStoreKey: InjectionKey<SignUpStore> = Symbol('SignUpStore');
export default SignUpStoreKey;