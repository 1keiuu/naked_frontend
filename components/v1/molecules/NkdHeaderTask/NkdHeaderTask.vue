<template>
  <div>
    <div id="task-card" class="task-card mr-2">
      <div class="task-card__inner">
        <h3 class="text-lg">{{ task.title }}</h3>
      </div>
      <div class="task-card__table">
        <div class="task-card__table__time">2:00</div>
        <button @click="updateRecord" class="open-play__button">
          <NkdIcon type="stop" color="grey" />
        </button>
      </div>
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

    const updateRecord = () => {
      context.root.$axios
        .patch(`/api/v1/records/${props.task?.record?.id}`, {
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
      updateRecord,
    }
  },
})
</script>
<style scoped lang="scss">
.task-card {
  background-color: #f5f4f4;
  display: flex;
  overflow: hidden;
  padding: 0 8px;
  width: auto;
  &__inner {
    padding: 9px;
  }
  .open-play__button {
    height: 45px;
    width: 45px;
    padding: 10px;
    margin: 0 0 0 auto;
  }
  &__table {
    // padding: 10px;
    display: flex;
    padding: 0 10px;
    border-left: 1px solid #c9ccce;
    &__time {
      padding: 11px;
    }
  }
}
.task-card:hover {
  background: #dfe2e6;
}
</style>
