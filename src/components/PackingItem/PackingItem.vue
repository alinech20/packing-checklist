<script setup lang="ts">
import type { IPackingItem } from '@/types/checklist.ts'
import { ref } from 'vue'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import ItemFields from '@/components/PackingItem/ItemFields.vue'
import ItemActions from '@/components/PackingItem/ItemActions.vue'

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

const { removeItemById, removeItemByTempId, editItemById, editItemByTempId } = usePackingItemStore()
const editMode = ref(false)

const saveItem = () => {
  editMode.value = false

  if (props.item.id)
    return editItemById(props.item.id, {
      name: name.value,
      qty: qty.value,
      buy_qty: buy_qty.value,
      prepared_qty: prepared_qty.value,
      packed_qty: packed_qty.value,
    })

  editItemByTempId(props.item.temp_id, {
    name: name.value,
    qty: qty.value,
    buy_qty: buy_qty.value,
    prepared_qty: prepared_qty.value,
    packed_qty: packed_qty.value,
  })
}

const removeItem = () => {
  if (props.item.id) return removeItemById(props.item.id)
  removeItemByTempId(props.item.temp_id)
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
  <!-- TODO: design -->
  <article class="packing-item">
    <form class="packing-item__edit-form">
      <ItemActions
        :edit-mode="editMode"
        @remove-click="removeItem"
        @edit-click="editMode = true"
        @save-click="saveItem"
      />
      <ItemFields
        :edit-mode="editMode"
        v-model:name="name"
        v-model:qty="qty"
        v-model:buy_qty="buy_qty"
        v-model:prepared_qty="prepared_qty"
        v-model:prepared="prepared"
        v-model:packed_qty="packed_qty"
        v-model:packed="packed"
        @change-prepared-qty="checkIfAllPrepared"
        @change-prepared="prepareAll"
        @change-packed-qty="checkIfAllPacked"
        @change-packed="packAll"
      />
    </form>
  </article>
</template>

<style lang="css">
.packing-item__field input[type='number'] {
  width: 40px;
}
</style>
