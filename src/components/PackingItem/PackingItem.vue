<script setup lang="ts">
import type { IPackingItem } from '@/interfaces/checklist.ts'
import { ref } from 'vue'
import { usePackingItemStore } from '@/stores/packing-item.ts'

const props = defineProps<{
  item: IPackingItem
}>()

// destructure prop to refs
const name = ref(props.item.name)
const qty = ref(props.item.qty)
const buy_qty = ref(props.item.buy_qty)
const prepared_qty = ref(props.item.prepared_qty)
const prepared = ref(props.item.prepared)
const packed_qty = ref(props.item.packed_qty)
const packed = ref(props.item.packed)

const { removeItemById, editItemById } = usePackingItemStore()
const editMode = ref(false)

const saveItem = (): void => {
  editItemById(props.item.id, {
    name: name.value,
    qty: qty.value,
    buy_qty: buy_qty.value,
    prepared_qty: prepared_qty.value,
    packed_qty: packed_qty.value,
  })

  editMode.value = false
}

const prepareAll = (val: Event): number => {
  // @ts-expect-error val.target is checkbox
  if (val.target?.checked) return (prepared_qty.value = qty.value)
  if (prepared_qty.value === props.item.prepared_qty) return (prepared_qty.value = 0)
  return (prepared_qty.value = props.item.prepared_qty)
}

const checkIfAllPrepared = (): boolean => {
  if (prepared_qty.value !== qty.value) return (prepared.value = false)
  return (prepared.value = true)
}

const packAll = (val: Event): number => {
  // @ts-expect-error val.target is checkbox
  if (val.target?.checked) return (packed_qty.value = qty.value)
  if (packed_qty.value === props.item.packed_qty) return (packed_qty.value = 0)
  return (packed_qty.value = props.item.packed_qty)
}

const checkIfAllPacked = (): boolean => {
  if (packed_qty.value !== qty.value) return (packed.value = false)
  return (packed.value = true)
}
</script>

<template>
  <!-- TODO: extract packing item field component -->
  <!-- TODO: extract packing item actions component -->
  <!-- TODO: extract packing item action component (for styling with icons and stuff) -->
  <!-- TODO: design -->
  <article class="packing-item">
    <form class="packing-item__edit-form" @submit.prevent="saveItem">
      <section class="packing-item__actions">
        <input
          type="button"
          class="packing-item__remove"
          @click="removeItemById(item.id)"
          value="Remove"
        />
        <input
          type="button"
          class="packing-item__edit"
          v-if="!editMode"
          @click="editMode = true"
          value="Edit"
        />
        <input type="submit" class="packing-item__save" v-else value="Save" />
      </section>
      <section class="packing-item__data">
        <label class="packing-item__field-label" for="name">Name</label>
        <input
          id="name"
          class="packing-item__field"
          type="text"
          :disabled="!editMode"
          v-model="name"
        />
        <label class="packing-item__field-label" for="qty">Quantity</label>
        <input
          id="qty"
          class="packing-item__field"
          type="number"
          min="0"
          step="1"
          :max="100"
          :disabled="!editMode"
          v-model="qty"
        />
        <label class="packing-item__field-label" for="buy_qty">Buy</label>
        <input
          id="buy_qty"
          class="packing-item__field"
          type="number"
          min="0"
          step="1"
          :max="qty"
          :disabled="!editMode"
          v-model="buy_qty"
        />
        <label class="packing-item__field-label" for="prepared_qty">Prepared</label>
        <input
          id="prepared_qty"
          class="packing-item__field"
          type="number"
          min="0"
          step="1"
          :max="qty"
          :disabled="!editMode"
          v-model="prepared_qty"
          @change="checkIfAllPrepared()"
        />
        <label class="packing-item__field-label" for="prepared">All Prep</label>
        <input
          id="prepared"
          class="packing-item__field"
          type="checkbox"
          v-model="prepared"
          @change="prepareAll"
        />
        <label class="packing-item__field-label" for="packed_qty">Packed</label>
        <input
          id="packed_qty"
          class="packing-item__field"
          type="number"
          min="0"
          step="1"
          :max="qty"
          :disabled="!editMode"
          v-model="packed_qty"
          @change="checkIfAllPacked"
        />
        <label class="packing-item__field-label" for="packed">All Pack</label>
        <input
          id="packed"
          class="packing-item__field"
          type="checkbox"
          :value="packed"
          @change="packAll"
        />
      </section>
    </form>
  </article>
</template>

<style lang="css">
.packing-item__field[type='number'] {
  width: 40px;
}
</style>
