<template>
  <div class="task-page w-full h-full">
    <!-- <UserPage
      :user="user"
      :userId="userId"
    /> -->
    {{query}}
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'

export default defineComponent({
  components: {},
  setup(_props, context) {
    const query = context.root.$route.query.username
    console.log(`${query}`)
    //ここが違う、urlからidを持ってくる方法

    return { query }
  },
})
</script>
