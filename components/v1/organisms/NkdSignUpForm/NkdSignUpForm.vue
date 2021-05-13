<template>
  <form @submit.prevent="onNkdButtonClick()" class="flex flex-col w-full">
    <NkdTextField
      type="name"
      name="name"
      placeholder="name"
      :value="SignUpStore.name"
      :maxLength="lengthRestrictions['name']"
      :isCounter="true"
      @onTextFieldInput="onInputTextField"
    />
    <NkdTextField
      type="email"
      name="email"
      placeholder="email"
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
    name: {
      type: String,
    },
  },
  setup(props, context) {
    const SignUpStore = inject(SignUpStoreKey)
    const lengthRestrictions = {
      name: 10,
      password: 20,
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
      } else if (type == 'name') {
        if (val.length <= lengthRestrictions['name']) SignUpStore.setName(val)
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
