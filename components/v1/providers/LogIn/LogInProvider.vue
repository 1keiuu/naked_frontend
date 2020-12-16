<template>
  <div class="log-in__provider">
    <slot />
  </div>
</template>
<script>
import { defineComponent, provide } from '@vue/composition-api'
import LogInStore from '~/store/LogIn/LogIn'
import LogInStoreKey from '../../storeKeys/LogInStoreKey.ts'

export default defineComponent({
  setup(_props, context) {
    provide(LogInStoreKey, LogInStore())
    return {}
  },
})
</script>

23:26:04.977  	Cloning github.com/loadmap/naked_frontend (Branch: master, Commit: f7e91c7)
23:26:06.190  	Cloning completed in 1213ms
23:26:06.193  	Analyzing source code...
23:26:06.863  	Installing build runtime...
23:26:07.234  	Build runtime installed: 370.185ms
23:26:07.626  	Looking up build cache...
23:26:07.667  	Build cache not found
23:26:08.060  	Installing dependencies...
23:26:31.817  	> deasync@0.1.21 install /vercel/workpath0/node_modules/deasync
23:26:31.817  	> node ./build.js
23:26:31.882  	`linux-x64-node-12` exists; testing
23:26:32.035  	Binary is fine; exiting
23:26:32.467  	> node-sass@5.0.0 install /vercel/workpath0/node_modules/node-sass
23:26:32.467  	> node scripts/install.js
23:26:32.785  	Downloading binary from https://github.com/sass/node-sass/releases/download/v5.0.0/linux-x64-72_binding.node
23:26:33.848  	Download complete
23:26:33.851  	Binary saved to /vercel/workpath0/node_modules/node-sass/vendor/linux-x64-72/binding.node
23:26:33.886  	Caching binary to /vercel/.npm/node-sass/5.0.0/linux-x64-72_binding.node
23:26:34.009  	> core-js@2.6.12 postinstall /vercel/workpath0/node_modules/@nuxt/babel-preset-app/node_modules/core-js
23:26:34.009  	> node -e "try{require('./postinstall')}catch(e){}"
23:26:34.136  	> core-js@2.6.12 postinstall /vercel/workpath0/node_modules/babel-runtime/node_modules/core-js
23:26:34.136  	> node -e "try{require('./postinstall')}catch(e){}"
23:26:34.252  	> ejs@2.7.4 postinstall /vercel/workpath0/node_modules/ejs
23:26:34.252  	> node ./postinstall.js
23:26:34.879  	> core-js@3.8.0 postinstall /vercel/workpath0/node_modules/core-js
23:26:34.879  	> node -e "try{require('./postinstall')}catch(e){}"
23:26:34.942  	> node-sass@5.0.0 postinstall /vercel/workpath0/node_modules/node-sass
23:26:34.942  	> node scripts/build.js
23:26:35.100  	Binary found at /vercel/workpath0/node_modules/node-sass/vendor/linux-x64-72/binding.node
23:26:35.100  	Testing binary
23:26:35.200  	Binary is fine
23:26:35.206  	> nuxt@2.14.9 postinstall /vercel/workpath0/node_modules/nuxt
23:26:35.206  	> opencollective || exit 0
23:26:36.887  	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules/watchpack-chokidar2/node_modules/fsevents):
23:26:36.887  	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
23:26:36.895  	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules/fsevents):
23:26:36.895  	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
23:26:36.901  	added 2111 packages from 995 contributors in 28.425s
23:26:38.056  	109 packages are looking for funding
23:26:38.056  	  run `npm fund` for details
23:26:59.361  	[fatal] Nuxt build error
23:26:59.361  	  ERROR in ./components/v1/providers/LogIn/LogInProvider.vue?vue&type=script&lang=js& (./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/v1/providers/LogIn/LogInProvider.vue?vue&type=script&lang=js&)
23:26:59.361  	  Module not found: Error: Can't resolve '../../storeKeys/LoginStoreKey.ts' in 'components/v1/providers/LogIn'
23:26:59.361  	  @ ./components/v1/providers/LogIn/LogInProvider.vue?vue&type=script&lang=js& (./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/v1/providers/LogIn/LogInProvider.vue?vue&type=script&lang=js&) 8:0-61 11:12-25
23:26:59.361  	  @ ./components/v1/providers/LogIn/LogInProvider.vue?vue&type=script&lang=js&
23:26:59.361  	  @ ./components/v1/providers/LogIn/LogInProvider.vue
23:26:59.361  	  @ ./pages/login/index.vue
23:26:59.362  	  @ ./node_modules/.cache/nuxt/router.js
23:26:59.362  	  @ ./node_modules/.cache/nuxt/index.js
23:26:59.362  	  @ ./node_modules/.cache/nuxt/client.js
23:26:59.362  	  @ multi ./node_modules/@nuxt/components/lib/installComponents.js ./node_modules/.cache/nuxt/client.js
23:26:59.362  	  
23:26:59.362  	  ERROR in ./plugins/composition-api.ts
23:26:59.362  	  Module not found: Error: Can't resolve '~/store/SignUp/node_modules/@vue/composition-api' in 'plugins'
23:26:59.362  	  @ ./plugins/composition-api.ts 2:0-81 3:8-25
23:26:59.362  	  @ ./node_modules/.cache/nuxt/index.js
23:26:59.362  	  @ ./node_modules/.cache/nuxt/client.js
23:26:59.362  	  @ multi ./node_modules/@nuxt/components/lib/installComponents.js ./node_modules/.cache/nuxt/client.js
23:26:59.362  	  
23:26:59.362  	  ERROR in ./store/LogIn/LogIn.ts
23:26:59.362  	  Module not found: Error: Can't resolve '~/store/SignUp/node_modules/@vue/composition-api' in 'store/LogIn'
23:26:59.362  	  @ ./store/LogIn/LogIn.ts 1:0-76 3:14-22
23:26:59.362  	  @ ./node_modules/.cache/nuxt/store.js
23:26:59.362  	  @ ./node_modules/.cache/nuxt/index.js
23:26:59.362  	  @ ./node_modules/.cache/nuxt/client.js
23:26:59.362  	  @ multi ./node_modules/@nuxt/components/lib/installComponents.js ./node_modules/.cache/nuxt/client.js
23:26:59.362  	  
23:26:59.363  	  ERROR in components/v1/organisms/NkdLogInForm/NkdLogInForm.vue:41:9
23:26:59.363  	  TS2571: Object is of type 'unknown'.
23:26:59.363  	  39 |     const onInputTextField = (type: string, val: string) => {
23:26:59.363  	  40 |       if (type == 'email') {
23:26:59.363  	  > 41 |         LogInStore.setEmail(val)
23:26:59.363  	  |         ^^^^^^^^^^
23:26:59.363  	  42 |       } else if (type == 'password') {
23:26:59.363  	  43 |         LogInStore.setPassword(val)
23:26:59.363  	  44 |       }
23:26:59.363  	  
23:26:59.363  	  ERROR in components/v1/organisms/NkdLogInForm/NkdLogInForm.vue:43:9
23:26:59.363  	  TS2571: Object is of type 'unknown'.
23:26:59.363  	  41 |         LogInStore.setEmail(val)
23:26:59.363  	  42 |       } else if (type == 'password') {
23:26:59.363  	  > 43 |         LogInStore.setPassword(val)
23:26:59.363  	  |         ^^^^^^^^^^
23:26:59.363  	  44 |       }
23:26:59.363  	  45 |     }
23:26:59.363  	  46 |
23:26:59.363  	  
23:26:59.364  	  ERROR in components/v1/organisms/NkdSignUpForm/NkdSignUpForm.vue:41:9
23:26:59.364  	  TS2571: Object is of type 'unknown'.
23:26:59.364  	  39 |     const onInputTextField = (type: string, val: string) => {
23:26:59.364  	  40 |       if (type == 'email') {
23:26:59.364  	  > 41 |         SignUpStore.setEmail(val)
23:26:59.364  	  |         ^^^^^^^^^^^
23:26:59.364  	  42 |       } else if (type == 'password') {
23:26:59.364  	  43 |         SignUpStore.setPassword(val)
23:26:59.364  	  44 |       }
23:26:59.364  	  
23:26:59.364  	  ERROR in components/v1/organisms/NkdSignUpForm/NkdSignUpForm.vue:43:9
23:26:59.364  	  TS2571: Object is of type 'unknown'.
23:26:59.364  	  41 |         SignUpStore.setEmail(val)
23:26:59.364  	  42 |       } else if (type == 'password') {
23:26:59.364  	  > 43 |         SignUpStore.setPassword(val)
23:26:59.364  	  |         ^^^^^^^^^^^
23:26:59.364  	  44 |       }
23:26:59.364  	  45 |     }
23:26:59.365  	  46 |
23:26:59.365  	  
23:26:59.365  	  ERROR in components/v1/storeKeys/LogInStoreKey.ts:1:30
23:26:59.365  	  TS2307: Cannot find module '~/store/SignUp/node_modules/@vue/composition-api' or its corresponding type declarations.
23:26:59.365  	  > 1 | import { InjectionKey } from '~/store/SignUp/node_modules/@vue/composition-api';
23:26:59.365  	  |                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
23:26:59.365  	  2 | import { LogInStore } from '~/store/LogIn/LogIn';
23:26:59.365  	  3 |
23:26:59.365  	  4 | const LogInStoreKey: InjectionKey<LogInStore> = Symbol('LogInStore');
23:26:59.365  	  
23:26:59.365  	  ERROR in components/v1/storeKeys/SignUpStoreKey.ts:1:30
23:26:59.365  	  TS2307: Cannot find module '~/store/SignUp/node_modules/@vue/composition-api' or its corresponding type declarations.
23:26:59.365  	  > 1 | import { InjectionKey } from '~/store/SignUp/node_modules/@vue/composition-api';
23:26:59.365  	  |                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
23:26:59.365  	  2 | import { SignUpStore } from '~/store/SignUp/SignUp';
23:26:59.365  	  3 |
23:26:59.365  	  4 | const SignUpStoreKey: InjectionKey<SignUpStore> = Symbol('SignUpStore');
23:26:59.365  	  
23:26:59.366  	  ERROR in components/v1/templates/LogInPage.vue:48:28
23:26:59.366  	  TS2571: Object is of type 'unknown'.
23:26:59.366  	  46 |         .loginWith('local', {
23:26:59.366  	  47 |           data: {
23:26:59.366  	  > 48 |             user: { email: LogInStore.email, password: LogInStore.password },
23:26:59.366  	  |                            ^^^^^^^^^^
23:26:59.366  	  49 |           },
23:26:59.366  	  50 |         })
23:26:59.366  	  51 |         .then((response) => {
23:26:59.366  	  
23:26:59.366  	  ERROR in components/v1/templates/LogInPage.vue:48:56
23:26:59.366  	  TS2571: Object is of type 'unknown'.
23:26:59.366  	  46 |         .loginWith('local', {
23:26:59.366  	  47 |           data: {
23:26:59.366  	  > 48 |             user: { email: LogInStore.email, password: LogInStore.password },
23:26:59.366  	  |                                                        ^^^^^^^^^^
23:26:59.366  	  49 |           },
23:26:59.366  	  50 |         })
23:26:59.366  	  51 |         .then((response) => {
23:26:59.366  	  
23:26:59.366  	  ERROR in components/v1/templates/SignUpPage.vue:41:26
23:26:59.366  	  TS2571: Object is of type 'unknown'.
23:26:59.366  	  39 |       context.root.$axios
23:26:59.366  	  40 |         .post('/api/v1/users/signup', {
23:26:59.366  	  > 41 |           user: { email: SignUpStore.email, password: SignUpStore.password },
23:26:59.366  	  |                          ^^^^^^^^^^^
23:26:59.367  	  42 |         })
23:26:59.367  	  43 |         .then((response) => {
23:26:59.367  	  44 |           context.root.$auth.setUser(response.data.user)
23:26:59.367  	  
23:26:59.367  	  ERROR in components/v1/templates/SignUpPage.vue:41:55
23:26:59.367  	  TS2571: Object is of type 'unknown'.
23:26:59.367  	  39 |       context.root.$axios
23:26:59.367  	  40 |         .post('/api/v1/users/signup', {
23:26:59.367  	  > 41 |           user: { email: SignUpStore.email, password: SignUpStore.password },
23:26:59.367  	  |                                                       ^^^^^^^^^^^
23:26:59.367  	  42 |         })
23:26:59.367  	  43 |         .then((response) => {
23:26:59.367  	  44 |           context.root.$auth.setUser(response.data.user)
23:26:59.367  	  
23:26:59.367  	  ERROR in plugins/composition-api.ts:2:31
23:26:59.367  	  TS2307: Cannot find module '~/store/SignUp/node_modules/@vue/composition-api' or its corresponding type declarations.
23:26:59.367  	  1 | import Vue from 'vue'
23:26:59.367  	  > 2 | import VueCompositionApi from '~/store/SignUp/node_modules/@vue/composition-api'
23:26:59.367  	  |                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
23:26:59.367  	  3 |
23:26:59.367  	  4 | Vue.use(VueCompositionApi)
23:26:59.367  	  
23:26:59.367  	  ERROR in store/LogIn/LogIn.ts:1:26
23:26:59.367  	  TS2307: Cannot find module '~/store/SignUp/node_modules/@vue/composition-api' or its corresponding type declarations.
23:26:59.368  	  > 1 | import { reactive } from '~/store/SignUp/node_modules/@vue/composition-api';
23:26:59.368  	  |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
23:26:59.368  	  2 |
23:26:59.368  	  3 | export default function LogInStore() {
23:26:59.368  	  4 |   const state = reactive({
23:26:59.378  	   ╭─────────────────────────────╮
23:26:59.378  	   │                             │
23:26:59.378  	   │   ✖ Nuxt Fatal Error        │
23:26:59.378  	   │                             │
23:26:59.378  	   │   Error: Nuxt build error   │
23:26:59.378  	   │                             │
23:26:59.378  	   ╰─────────────────────────────╯
23:26:59.398  	Error: Command "nuxt-ts generate" exited with 1
23:27:01.529  	Done with "package.json"