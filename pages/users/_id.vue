<template>
  <div class="task-page w-full h-full">
    <UserPage
      :user="userPageStore.selectedUser"
      :userId="userId"
    />
    <div class="show-card" :class="{ '--active': userPageStore.isUpdatingUser }">
      <div class="show-card__modal" :class="{ '--active': userPageStore.isUpdatingUser }">
        <nkd-user-modal :user="userPageStore.selectedUser" v-if="loaded"/>
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
  inject,
} from '@vue/composition-api'
import UserPage from '@/components/v1/templates/User/UserPage.vue'
import UserPageStoreKey from '@/components/v1/storeKeys/UserPageStoreKey'
import NkdUserModal from '@/components/v1/organisms/NkdUserModal/NkdUserModal.vue'
import ReportsStoreKey from '@/components/v1/storeKeys/ReportsStoreKey'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'
import NkdReportItemsList from '@/components/v1/organisms/NkdReportItemsList/NkdReportItemsList.vue'

export default defineComponent({
  components: { UserPage, NkdUserModal, NkdReportItemsList },
  setup(_props, context) {
    const userPageStore = inject(UserPageStoreKey)
    const user = ref({})
    const loaded = ref(false)

    const userId = context.root.$route.params.id
    //ここが違う、urlからidを持ってくる方法
    const reportsStore = inject(ReportsStoreKey)
    const reportPageStore = inject(ReportPageStoreKey)

    context.root.$axios
      .get(`api/v1/users/${userId}`)
      .then((res) => {
        userPageStore?.selectUser(res.data.user)
        reportsStore.setReports(res.data.reports)
        loaded.value = true
      })
      .catch((e) => {
        console.error(e)
      })

    return {
      user,
      userId,
      userPageStore,
      loaded,
      reportPageStore,
      reportsStore,
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
      height: 600px;
      border-radius: 16px;
      z-index: 1;
      max-height: calc(100vh - 140px);
    }
  }
}
</style>
