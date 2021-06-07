<template>
  <div class="mt-16 pt-12 pl-56 h-screen overflow-scroll">
    <div class="show-page">
      <div class="show-page__image-add">
        <img
          :src="userPageStore.selectedUser.avatar_url"
          v-if="userPageStore.selectedUser.avatar_url"
          id="avatar"
          class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover show-page__image"
        />
        <img
          src="~/assets/images/avatar.jpg"
          v-else
          id="avatar"
          class="rounded-full h-12 mr-2 cursor-pointer w-12 object-cover show-page__image"
        />
        <input type="file" id="imageInput"/>
      </div>
      <h1 class="show-page__name">{{ userPageStore.selectedUser.name }}</h1>
      <div v-if="current_user_id == user.id">
        <button class="mr-5" @click="onUpdateUserBtnClick">
          <p>プロフィールの編集</p>
        </button>
      </div>
      <div v-else-if="followBoolean  == true">
        <button class="mr-5" @click="onUnFollowBtnClick">
          <p>フォロ-を外す</p>
        </button>
      </div>
      <div v-else>
        <button class="mr-5" @click="onFollowBtnClick">
          <p>フォローする</p>
        </button>
      </div>
    </div>
    <div class="show-report">
      <NkdReportItemsList :reports="reportsStore.reports" @onClickReportDelete="onClickReportDelete"/>
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
import UserPageStoreKey from '@/components/v1/storeKeys/UserPageStoreKey'
import ReportsStoreKey from '@/components/v1/storeKeys/ReportsStoreKey'
import ReportPageStoreKey from '@/components/v1/storeKeys/ReportPageStoreKey'
import NkdReportItemsList from '@/components/v1/organisms/NkdReportItemsList/NkdReportItemsList.vue'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
    },
    userId: String,
  },
  components: {},
  setup(props, context) {
    const userPageStore = inject(UserPageStoreKey)
    const followBoolean = ref(false)
    const current_user_id = context.root.$auth.user.id
    const reportsStore = inject(ReportsStoreKey)
    const reportPageStore = inject(ReportPageStoreKey)

    context.root.$axios
      .post('api/v1/users/followings', {
        follow: {
          user_id: props?.userId,
          current_user_id: current_user_id,
        },
      })
      .then((res) => {
        followBoolean.value = res.data.boolean
      })
      .catch((e) => {
        console.error(e)
      })

    const onFollowBtnClick = () => {
      if (props.user) {
        context.root.$axios
          .post('api/v1/relationships', {
            follow_id: props.user.id,
          })
          .then((res) => {
            if (!props.user) return
            followBoolean.value = true
          })
          .catch((e) => {})
      }
    }

    const onUnFollowBtnClick = () => {
      if (props.user) {
        context.root.$axios
          .post('api/v1/relationships/unfollow', {
            follow_id: props.user.id,
          })
          .then((res) => {
            if (!props.user) return
            followBoolean.value = false
          })
          .catch((e) => {})
      }
    }

    const onClickReportDelete = () => {
      const reportId = reportPageStore?.selectedReport.id
      context.root.$axios
        .delete(`/api/v1/reports/${reportId}`)
        .then((res) => {
          // TODO: storeの削除系まとめたい
          reportsStore.deleteReports(reportId)
        })
        .catch((e) => {})
    }

    const onUpdateUserBtnClick = () => {
      userPageStore?.startUpdateUser()
    }

    return {
      userPageStore,
      current_user_id,
      onFollowBtnClick,
      onUnFollowBtnClick,
      followBoolean,
      onUpdateUserBtnClick,
      reportPageStore,
      reportsStore,
      onClickReportDelete,
    }
  },
})
</script>

<style scoped lang="scss">
.show-page {
  -webkit-box-align: center;
  align-items: center;
  border-bottom: 1px solid rgb(220, 228, 243);
  display: flex;
  height: 60px;
  z-index: 2;
  padding: 0px 30px;
  width: 100%;
  position: sticky;
  top: 30px;
  &__name {
    font-size: 22px;
    font-weight: 550;
    line-height: 29px;
    margin: 0px 15px 0px 20px;
  }
  &__image-add {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
    position: relative;
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0%;
    }
  }
  &__image {
    border: 4px solid rgb(255, 255, 255);
    height: 180px;
    width: 180px;
    overflow: hidden;
    background: rgb(242, 241, 249);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
  }
}
.show-report {
  margin-top: 100px;
  width: 80%;
  margin-left: 160px;
}
</style>
