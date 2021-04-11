<template>
  <div v-if="reportPageStore.isCreatingReport">
    <div class="report-header" @click="clickCloseClick">
      <NkdIcon type="close" color="black" class="report-header__close"/>
    </div>
    <div class="report-body">
      <div>
        今日やったこと
      </div>
      <ul style="list-style: circle;">
        <li>hello</li>
        <li>hello2</li>
      </ul>
    </div>

  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  onMounted,
  watch,
} from '@vue/composition-api'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'
import NkdIcon from '../../atoms/NkdIcon/NkdIcon.vue'

export default defineComponent({
  components: {
    NkdIcon,
  },
  props: {},
  setup(props, context) {
    const reportPageStore = inject(ReportPageStoreKey)

    const clickCloseClick = () => {
      reportPageStore?.stopCreateReport()
    }

    return { reportPageStore, clickCloseClick }
  },
})
</script>
<style scoped lang="scss">
.report-header {
  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 16px;
    cursor: pointer;
  }
}

.report-body {
  position: absolute;
  left: 15px;
  top: 50px;
}
</style>
