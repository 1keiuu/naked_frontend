<template>
  <div class="task-page w-full h-full">
    <div class="mt-16 pl-56 pt-3">
      <div class="user__sub-header ">ユーザー管理画面</div>
      <div class="box">
        <div class="box__card">
        <NkdTextField
          type="email"
          name="email"
          placeholder="email"
        />
        </div>
        <div class="box__search-card">
          <button class="mr-5 search-card__button">
            <p>招待する</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  PropType,
  inject,
  watchEffect,
} from '@vue/composition-api'
import NkdTextField from '@/components/v1/atoms/NkdTextField/NkdTextField.vue'
import UsersStoreKey from '@/components/v1/storeKeys/UsersStoreKey'

export default defineComponent({
  components: { NkdTextField },
  setup(props, context) {
    const usersStore = inject(UsersStoreKey)

    // context.root.$axios
    //   .post('api/v1/users/search', {
    //     q: query,
    //   })
    //   .then((res) => {
    //     usersStore.setUsers(res.data)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })

    // const onInputTextField = (type: string, val: string) => {
    //   if (type == 'email') {
    //     SignUpStore.setEmail(val)
    //   }
    // }

    return { usersStore }
  },
})
</script>
<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  &__card {
    flex: 1;
    align-items: center;
    margin-left: 10px;
  }
  &__search-card {
    flex: 2;
  }
}
.search-card {
  &__button {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #c0c4c5;
    height: 32px;
    padding: 0px 12px;
    border-radius: 30px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    border: 1px solid #dfe3e6;
    margin-bottom: 20px;
  }
}
.user__sub-header {
  top: 4em;
  z-index: 2;
  padding: 10px;
  font-size: 20px;
  font-weight: 550;
}
</style>
