<script setup lang="ts">
import CustomInput from '@/components/Global/forms/CustomInput.vue'

defineProps<{
  editMode: boolean
}>()

defineEmits(['changePreparedQty', 'changePrepared', 'changePackedQty', 'changePacked'])

const name = defineModel<string>('name')
const qty = defineModel<number>('qty')
const buy_qty = defineModel<number>('buy_qty')
const prepared_qty = defineModel<number>('prepared_qty')
const prepared = defineModel<boolean>('prepared')
const packed_qty = defineModel<number>('packed_qty')
const packed = defineModel<boolean>('packed')
</script>

<template>
  <section class="packing-item__data">
    <CustomInput
      class="packing-item__field"
      type="text"
      label="Name"
      label_for="name"
      :disabled="!editMode"
      v-model.capitalize.trim="name"
    />
    <CustomInput
      label_for="qty"
      label="Quantity"
      class="packing-item__field"
      type="number"
      :min="0"
      :step="1"
      :max="100"
      :disabled="!editMode"
      v-model.trim="qty"
    />
    <CustomInput
      label_for="buy_qty"
      label="Buy"
      class="packing-item__field"
      type="number"
      :min="0"
      :step="1"
      :max="qty"
      :disabled="!editMode"
      v-model="buy_qty"
    />
    <CustomInput
      label_for="prepared_qty"
      label="Prepared"
      class="packing-item__field"
      type="number"
      :min="0"
      :step="1"
      :max="qty"
      :disabled="!editMode"
      v-model="prepared_qty"
      @change="$emit('changePreparedQty')"
    />
    <CustomInput
      label_for="prepared"
      label="All Prep"
      class="packing-item__field"
      type="checkbox"
      v-model="prepared"
      @change="$emit('changePrepared')"
    />
    <CustomInput
      label_for="packed_qty"
      label="Packed"
      class="packing-item__field"
      type="number"
      :min="0"
      :step="1"
      :max="qty"
      :disabled="!editMode"
      v-model="packed_qty"
      @change="$emit('changePackedQty')"
    />
    <CustomInput
      label_for="packed"
      label="All Pack"
      class="packing-item__field"
      type="checkbox"
      v-model="packed"
      @change="$emit('changePacked')"
    />
  </section>
</template>

<style scoped lang="css"></style>
