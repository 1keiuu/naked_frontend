<template>
  <div class="target-card">
    <div class="target-card__header">
      今月の目標
    </div>
    <div class="target-card__inner" v-if="meetPageStore.selectedTarget">
      3 / {{meetPageStore.selectedTarget.target_count}}
    </div>
    <div class="target-card__inner" v-else>
      なし
    </div>
    <div class="target-card__supplement">
      （実施回数/目標回数）
    </div>
    <div class="target-card__pencil" @click="onClickCreateTarget">
      <NkdIcon type="pencil" color="rgb(149 150 152)"/>
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
  computed,
} from '@vue/composition-api'
import NkdIcon from '@/components/v1/atoms/NkdIcon/NkdIcon.vue'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'

export default defineComponent({
  components: { NkdIcon },
  props: {},
  setup(props, context) {
    const meetPageStore = inject(MeetPageStoreKey)
    // targetCountは使っていない
    const onClickCreateTarget = () => {
      meetPageStore?.startUpdateTarget()
    }
    return { onClickCreateTarget, meetPageStore }
  },
})
</script>
<style scoped lang="scss">
.target-card {
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  border: 1px solid rgb(220, 228, 243);
  // box-shadow: rgb(0 0 0 / 8%) 0px 1px 3px 0px;
  position: relative;
  padding: 10px;
  width: 400px;
  display: flex;
  margin-top: 10px;
  margin-right: auto;
  margin-left: 10px;
  &__header {
    top: 4em;
    z-index: 2;
    padding: 10px;
    font-size: 18px;
    font-weight: 550;
  }
  &__inner {
    padding-top: 24px;
    padding-left: 24px;
    font-size: 20px;
  }
  &__supplement {
    font-size: 15px;
    padding-top: 30px;
  }
  &__pencil {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 30px;
    height: 30px;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    background: rgb(243, 250, 255);
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
}
</style>
