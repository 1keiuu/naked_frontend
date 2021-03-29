<template>
  <div>
    <!-- なぜかキャメルケースだとエラーが起きる -->
    <nkd-record-item
      v-for="record in records"
      :key="'record' + record.id + type"
      :record="record"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import NkdReCordItem from '@/components/v1/molecules/NkdRecordItem/NkdRecordItem.vue'

export default defineComponent({
  props: {
    records: {
      type: Array,
    },
    type: { type: String },
  },
  componentes: {
    NkdReCordItem,
  },
  setup(_props, context) {
    return {}
  },
})
</script>
<style scoped></style>
