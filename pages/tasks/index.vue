<template>
  <div class="task-page" />
</template>
<script lang="ta">
import {defineComponent} from "@vue/composition-api"
export default defineComponent({
  setup(_props,context) {
    context.root.$axios.get('/api/v1/tasks').then((res)=>{
      console.log(res)
    }).catch(e=>{console.log(e)})
  }
})
</script>
