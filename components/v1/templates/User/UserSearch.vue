<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <div v-for="user in users.users" :key="user.name">
      <div class="box">
        <img
        src="~/assets/images/avatar.jpg"
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
        />
        {{ user.name }}
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
  onMounted,
} from '@vue/composition-api'

export default defineComponent({
  props: {
    users: {},
  },
  components: {},
  setup(_props, context) {
    return {}
  },
})
</script>
<style scoped lang="scss">
.box {
  display: flex;
}
</style>
