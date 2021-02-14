<template>
  <div
    class="mt-16 pt-12 pl-56 h-screen overflow-scroll"
  >
    <div>{{ user.name}}</div>
    <img
      src="~/assets/images/avatar.jpg"
      id="avatar"
      class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  PropType,
} from '@vue/composition-api'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
    },
  },
  components: {},
  setup(props, context) {
    console.log(props)
    console.log(props.user)
  },
})
</script>
