<template>
  <div v-if="meetPageStore.isUpdatingTarget">
    <div class="target-header" @click="clickCloseClick">
      <div class="target-header__profile">目標回数</div>
      <NkdIcon type="close" color="black" class="target-header__close"/>
    </div>
    <div class="target-card">
      <NkdLabel name="target_count" value="回数" />
      <NkdTextField
        :isOutLined="true"
        :value="targetCount"
        name="target_count"
        @onTextFieldBlur="onTextFieldBlur"
      />
    </div>
    <div class="target-bottom">
      <button class="target-bottom__button" @click="onEditTargetBtnClick">
        <p>完了</p>
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
  onMounted,
  watch,
  computed,
} from '@vue/composition-api'
import MeetPageStoreKey from '@/components/v1/storeKeys/MeetPageStoreKey'

export default defineComponent({
  components: {},
  props: {
    target: {
      type: Object,
    },
  },
  setup(props, context) {
    const meetPageStore = inject(MeetPageStoreKey)
    const targetCount = ref()

    if (props.target?.target_count) {
      targetCount.value = props.target.target_count
    }

    const onEditTargetBtnClick = () => {
      //完了を押した時にstoreに入れる
      meetPageStore?.stopUpdateTarget()
      // const target = meetPageStore?.selectedTarget
      // if (!target) return
      // target.target_count = targetCount.value
      const targetId =
        meetPageStore?.selectedTarget == null
          ? null
          : meetPageStore?.selectedTarget.id
      const params = {
        target_count: targetCount.value,
        id: targetId,
      }

      let formData = new FormData()

      Object.entries(params).forEach(([key, value]) =>
        formData.append(key, value)
      )

      context.root.$axios
        .post('/api/v1/targets', formData)
        .then((res) => {
          const target = res.data.target
          meetPageStore?.setSelectTarget(res.data.target)
        })
        .catch((e) => {})
    }

    const clickCloseClick = () => {
      meetPageStore?.stopUpdateTarget()
    }

    const onTextFieldBlur = (inputValue: number) => {
      // if (
      //   meetPageStore?.selectedTarget?.target_count !== inputValue &&
      //   props.target
      // )
      updateTargetCount({
        id: props?.target?.id,
        target_count: inputValue,
      })
    }

    const updateTargetCount = (obj: any) => {
      // if (!props.target || !obj.target_count) return
      if (obj.target_count.length > 3)
        return alert('目標回数は3桁以内で入力してください')
      // if (typeof obj.target_count == 'string')
      //   return alert('数値を入力してください')
      const target = meetPageStore?.selectedTarget
      // 変更ない場合は弾く
      if (target) {
        if (obj.target_count == target.target_count) return
        targetCount.value = obj.target_count
      } else {
        targetCount.value = obj.target_count
      }
      // target.target_count = obj.target_count
    }

    return {
      meetPageStore,
      clickCloseClick,
      onEditTargetBtnClick,
      onTextFieldBlur,
      targetCount,
    }
  },
})
</script>
<style scoped lang="scss">
.target-header {
  &__profile {
    position: absolute;
    top: 15px;
    left: 230px;
  }
  &__close {
    position: absolute;
    top: 15px;
    right: 15px;
    height: 16px;
    cursor: pointer;
  }
}

.target-body {
  position: absolute;
  left: 15px;
  top: 50px;
  display: flex;
  &__text {
    margin-top: 20px;
  }
  &__image {
    height: 150px;
    width: 150px;
  }
  &__file {
    display: inline-block;
    position: absolute;
    left: 180px;
    top: 105px;
    background: #757171;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    padding: 10px 18px;
    border-radius: 4px;
    transition: all 0.3s;
    height: 45px;
    width: 200px;
  }
  &__file:hover {
    background: #888;
    transition: all 0.4s;
  }
  &__file input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}

.target-card {
  position: absolute;
  left: 15px;
  top: 100px;
}

.target-bottom {
  position: absolute;
  left: 15px;
  top: 230px;
  &__button {
    position: relative;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #50bfff;
    height: 50px;
    width: 540px;
    padding: 0px 12px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    border: 1px solid #a4cef9;
  }
}
</style>
