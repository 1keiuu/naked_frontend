<template>
  <form @submit.prevent="onNkdButtonClick()" class="flex flex-col w-full">
    <NkdTextField
      type="email"
      name="email"
      placeholder="email"
      @onTextFieldInput="onInputTextField"
    />
    <NkdTextField
      type="password"
      placeholder="password"
      name="password"
      @onTextFieldInput="onInputTextField"
    />
    <NkdButton title="ログイン" type="submit" />
  </form>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'
import NkdTextField from '../../atoms/NkdTextField/NkdTextField.vue'
import NkdButton from '../../atoms/NkdButton/NkdButton.vue'
import LogInStoreKey from '../../storeKeys/LogInStoreKey'

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
    const LogInStore = inject(LogInStoreKey)

    if (!LogInStore) {
      throw new Error(`${LogInStoreKey} is not provided`)
    }

    const onNkdButtonClick = () => {
      context.emit('recieveClickEvent')
    }

    const onInputTextField = (type: string, val: string) => {
      if (type == 'email') {
        LogInStore.setEmail(val)
      } else if (type == 'password') {
        LogInStore.setPassword(val)
      }
    }

    return { onNkdButtonClick, onInputTextField }
  },
})
</script>
