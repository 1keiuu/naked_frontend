<template>
  <div class="text-field__wrapper mb-5">
    <input
      @input="onInput"
      @blur="onBlur"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :name="name"
      :maxLength="maxLength"
      autocomplete
      :class="{
        '--outlined': isOutLined,
        '--error': value && value.length >= maxLength,
      }"
      class="nkd__text-field w-full p-2 rounded-sm border-2 border-opacity-30 border-gray-500 placeholder-opacity-50"
    />
    <p v-if="isCounter" class="counter">
      <span :class="{ '--error': value && value.length >= maxLength }">{{
        value.length
      }}</span
      >/{{ maxLength }}
    </p>
  </div>
</template>
<script lang="ts">
import { computed, ref } from '@vue/composition-api'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    isOutLined: {
      type: Boolean,
      required: false,
    },
    value: {},
    name: {
      type: String,
      required: true,
    },
    maxLength: {
      type: Number,
      required: false,
    },
    isCounter: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const onInput = (e: KeyboardEvent) => {
      context.emit(
        'onTextFieldInput',
        props.type,
        (e.target as HTMLInputElement).value
      )
    }
    const onBlur = (e: Event) => {
      context.emit('onTextFieldBlur', (e.target as HTMLInputElement).value)
    }

    return { onInput, onBlur }
  },
})
</script>
<style scoped lang="scss">
.text-field__wrapper {
  position: relative;
}
.nkd__text-field {
  &.--outlined {
    outline: 0;
    background: transparent;
    border: 0;
    border-bottom: 2px solid rgb(195, 195, 195);
  }
  &.--error {
    border: 2px solid rgb(254, 87, 87);
  }
}
.counter {
  position: absolute;
  bottom: 5px;
  right: 10px;
  margin: auto;
  height: fit-content;
  color: grey;
  span {
    &.--error {
      color: rgb(254, 87, 87);
    }
  }
}
</style>
