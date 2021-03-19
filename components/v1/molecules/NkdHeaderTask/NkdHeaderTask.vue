<template>
  <div>
    <div id="task-card" class="task-card">
      <div class="task-card__inner">
        <h3 class="text-lg">{{ task.title }}</h3>
      </div>
      <button @click="createRecord" class="open-play__button">
        <NkdIcon type="play" color="grey" />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  watch,
} from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    task: {
      type: Object as PropType<Task>,
    },
  },
  setup(props, context) {
    const date = ref(new Date())
    const taskPageStore = inject(TaskPageStoreKey)
    const isCalenderOpen = ref(false)
    const selectedDate = ref({ start: String, end: String })

    const createRecord = () => {
      context.root.$axios
        .post('/api/v1/records', {
          task_id: props.task?.id,
          user_id: context.root.$auth.user.id,
        })
        .then((res) => {
          const record = res.data.record
        })
        .catch((e) => {})
    }

    return {
      selectedDate,
      date,
      createRecord,
    }
  },
})
</script>
<style scoped lang="scss">
.task-card {
  .open-play__button {
    opacity: 0;
    height: 45px;
    width: 45px;
    padding: 10px;
    margin: 0 0 0 auto;
  }
  &:hover {
    .open-play__button {
      opacity: 1;
      pointer-events: unset;
    }
  }
}
.task-card:hover {
  background: #f1f4f7;
}
</style>
