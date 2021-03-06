<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <p v-for="user in users.users" :key="user.name">
      {{ user.name }}
    </p>
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
    console.log(`${_props.users}`)
    return {}
  },
})
</script>
