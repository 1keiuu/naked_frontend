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
    <div v-if="user_id == user.id">
      <button class="mr-5">
        <p>プロフィールの編集</p>
      </button>
    </div>
    <div v-else>
      <button class="mr-5">
        <p>フォローする</p>
      </button>
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
} from '@vue/composition-api'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
    },
  },
  components: {},
  setup(props, context) {
    // const  = ref('')
    const user_id = context.root.$auth.user.id
    console.log(user_id)
    // const onFollowBtnClick  = () => {
    //   if ( && props.task) {
    //     context.root.$axios
    //       .post('/api/v1/sub_tasks', {
    //         title: inputValue,
    //         task_id: props.task.id,
    //       })
    //       .then((res) => {
    //         if (!props.task) return
    //         const subTask = res.data.sub_task
    //         taskPageStore.appendToSelectedSubTasks(subTask)
    //       })
    //       .catch((e) => {})
    //   }
    // }
    return { user_id }
  },
})
</script>
