<template>
  <div>
    <!-- idのtask-cardを変えるときは注意 -->
    <div id="task-card" class="task-card" @click="onCardClick">
      <div class="task-card__inner">
        <h3 class="text-lg" id="task-card">{{ task.title }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, ref, Ref } from '@vue/composition-api'
import TaskPageStoreKey from '@/components/v1/storeKeys/TaskPageStoreKey'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import TasksStoreKey from '@/components/v1/storeKeys/TasksStoreKey'
import RecordsStoreKey from '@/components/v1/storeKeys/RecordsStoreKey'

export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {
    task: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  setup(props, context) {
    const date = ref(new Date())
    const record_time: Ref<string> = ref('')
    const taskPageStore = inject(TaskPageStoreKey)
    const isCalenderOpen = ref(false)
    const selectedDate: Ref<{ start: String; end: String }> = ref({
      start: '',
      end: '',
    })
    const tasksStore = inject(TasksStoreKey)
    const recordsStore = inject(RecordsStoreKey)

    // context.root.$axios
    //   .patch(`/api/v1/records/${recordId.value}`, {
    //     user_id: context.root.$auth.user.id,
    //   })
    //   .then((res) => {
    //     const record = res.data.record
    //     tasksStore.setCurrentTask(null)
    //     recordsStore?.setRecord(null)
    //     context.root.$router.go(0)
    //   })
    //   .catch((e) => {})

    return {}
  },
})
</script>
<style scoped lang="scss">
.task-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  // background: #fff;
  padding: 8px 12px;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  width: 95%;
  &__inner {
    flex: 1;
  }

  .open-calendar__button {
    pointer-events: none;
    opacity: 0;
    height: 40px;
    width: 40px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid grey;
  }
  &:hover {
    .open-calendar__button {
      opacity: 1;
      pointer-events: unset;
    }
  }
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
  .date__wrapper {
    margin-left: 100px;
    flex: 2;
    .starts-date,
    .due-date {
      color: grey;
      font-size: 13px;
    }
  }
  .calendar {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 5;
    height: 320px;
  }
  &__time {
    color: gray;
    font-size: 13px;
    width: 30px;
  }
}
.task-card:hover {
  background: #f1f4f7;
}
</style>
