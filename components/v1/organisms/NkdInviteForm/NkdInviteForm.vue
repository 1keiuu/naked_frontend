<template>
  <form @submit.prevent="onNkdButtonClick()" class="flex flex-col w-full">
    <NkdTextField
      type="userName"
      name="userName"
      placeholder="userName"
      :value="SignUpStore.userName"
      :maxLength="lengthRestrictions['userName']"
      :isCounter="true"
      @onTextFieldInput="onInputTextField"
    />
    <NkdTextField
      type="password"
      name="password"
      placeholder="password"
      :value='SignUpStore.password'
      :maxLength="lengthRestrictions['password']"
            :isCounter="true"
      @onTextFieldInput="onInputTextField"
    />
    <NkdButton title="新規登録" type="submit" />
  </form>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import NkdTextField from '../../atoms/NkdTextField/NkdTextField.vue'
import NkdButton from '../../atoms/NkdButton/NkdButton.vue'
import SignUpStoreKey from '../../storeKeys/SignUpStoreKey'

export default defineComponent({
  props: {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    companyName: {
      type: String,
    },
  },
  setup(props, context) {
    const SignUpStore = inject(SignUpStoreKey)
    const lengthRestrictions = {
      userName: 10,
      password: 20,
      companyName: 20,
    }
    if (!SignUpStore) {
      throw new Error(`${SignUpStoreKey} is not provided`)
    }

    const onNkdButtonClick = () => {
      context.emit('recieveClickEvent')
    }

    const onInputTextField = (type: string, val: string) => {
      if (type == 'email') {
        SignUpStore.setEmail(val)
      } else if (type == 'password') {
        if (val.length <= lengthRestrictions['password'])
          SignUpStore.setPassword(val)
      } else if (type == 'userName') {
        if (val.length <= lengthRestrictions['userName'])
          SignUpStore.setUserName(val)
      } else if (type == 'companyName') {
        if (val.length <= lengthRestrictions['companyName'])
          SignUpStore.setCompanyName(val)
      }
    }

    return {
      SignUpStore,
      lengthRestrictions,
      onNkdButtonClick,
      onInputTextField,
    }
  },
})
</script>
