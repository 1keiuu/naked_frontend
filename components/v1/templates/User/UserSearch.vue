<template>
  <div class="mt-16 pl-56 pt-3">
    <div v-for="user in users.users" :key="user.name">
      <div class="box pt-3">
        <img
        src="~/assets/images/avatar.jpg"
        id="avatar"
        class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover mb-2"
        />
        <div>
          {{ user.name }}
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
  border-bottom: 1px solid rgb(238, 238, 238);
  align-items: center;
  transition: opacity 150ms ease 0s;
}
.box:hover {
  background: #f1f4f7;
}
</style>
