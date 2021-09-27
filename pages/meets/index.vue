<template>
  <div class="task-page w-full h-full">
    <MeetsHeader
    />
    <MeetsPage :target="meetPageStore.selectedTarget"/>
    <div class="show-card" :class="{ '--active': meetPageStore.isUpdatingTarget }">
      <div class="show-card__modal" :class="{ '--active': meetPageStore.isUpdatingTarget }">
        <NkdTargetModal :target="meetPageStore.selectedTarget" v-if="loaded"/>
      </div>
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
  onMounted,
  inject,
} from '@vue/composition-api'
import MeetsPage from '@/components/v1/templates/Meets/MeetsPage.vue'
import MeetsHeader from '@/components/v1/templates/Meets/MeetsHeader.vue'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'
import NkdTargetModal from '@/components/v1/organisms/NkdTargetModal/NkdTargetModal.vue'

export default defineComponent({
  props: {},
  components: {
    MeetsPage,
    MeetsHeader,
    NkdTargetModal,
  },
  setup(props, context) {
    const meetPageStore = inject(MeetPageStoreKey)
    const loaded = ref(false)

    context.root.$axios
      .get('api/v1/targets')
      .then((res) => {
        meetPageStore?.setSelectTarget(res.data.target)
        loaded.value = true
      })
      .catch((e) => {
        console.error(e)
      })

    return {
      meetPageStore,
      loaded,
    }
  },
})
</script>

<style scoped lang="scss">
.show-card {
  &.--active {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding-top: 100px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    top: 0px;
    left: 0px;
    overflow: hidden;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
  }
  &__modal {
    &.--active {
      font-weight: bold;
      max-width: 600px;
      overflow: visible;
      transition: width 150ms ease 0s;
      position: relative;
      height: fit-content;
      width: 100%;
      background: rgb(251, 251, 253);
      height: 300px;
      border-radius: 16px;
      z-index: 1;
      max-height: calc(100vh - 140px);
    }
  }
}
</style>
