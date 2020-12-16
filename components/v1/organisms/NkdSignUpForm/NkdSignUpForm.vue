<template>
  <form @submit.prevent="onNkdButtonClick()" class="flex flex-col w-full">
    <NkdTextField type="email" placeholder="email" @input="onInputTextField" />
    <NkdTextField
      type="password"
      placeholder="password"
      @input="onInputTextField"
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
  },
  setup(props, context) {
    const SignUpStore = inject(SignUpStoreKey)

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
        SignUpStore.setPassword(val)
      }
    }

    return { onNkdButtonClick, onInputTextField }
  },
})
</script>
