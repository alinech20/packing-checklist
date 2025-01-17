import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants/stores.ts'
import { computed, ref } from 'vue'
import type { IPackingItem } from '@/interfaces/checklist.ts'

export const usePackingItemStore = defineStore(PINIA_STORE_KEYS.PACKING_ITEM, () => {
  const items = ref<IPackingItem[]>([])
  const itemList = computed(() => items.value)
  const setItems = (list: IPackingItem[]) => (items.value = list)

  const getItemById = (id: number): IPackingItem | undefined =>
    items.value.find((item) => item.id === id)
  const getItemByName = (name: string): IPackingItem | undefined =>
    items.value.find((item) => item.name === name)
  const getItemIdxById = (id: number): number => items.value.findIndex((item) => item.id === id)

  /**
   * Adds an item to the list
   *
   * @param { string } name Name of the item to add
   *
   * @return Added item in case of success, undefined otherwise
   */
  const addItem = (name: string): IPackingItem | undefined => {
    const trimmedName = name.trim()

    if (!trimmedName) return // don't add without name
    if (getItemByName(trimmedName)) return // TODO: add error for existing item

    items.value.push({
      id: items.value.length + 1,
      name: trimmedName,
      qty: 0,
      buy_qty: 0,
      prepared_qty: 0,
      prepared: false,
      packed_qty: 0,
      packed: false,
    } as IPackingItem)

    return items.value[items.value.length - 1]
  }

  /**
   * Removes an item by idx
   *
   * @param {number} idx Index of the item to be removed
   *
   * @return Array of removed items or undefined if index is invalid
   */
  const removeItemByIdx = (idx: number): IPackingItem[] | undefined => {
    if (idx === -1) return // TODO: add error for not found
    return items.value.splice(idx, 1)
  }

  /**
   * Removes an item by id
   *
   * @param { number } id Id of the item to be removed
   *
   * @return Array of removed items or undefined if id doesn't exist
   */
  const removeItemById = (id: number) => removeItemByIdx(getItemIdxById(id))

  /**
   * Edits an item by id
   *
   * @param { number } id Id of the item to edit
   * @param { Partial<IPackingItem> } item New info of the item
   *
   * @return Edited item in case of success, undefined otherwise
   */
  const editItemById = (id: number, item: Partial<IPackingItem>): IPackingItem | undefined => {
    const old = getItemById(id)
    if (!old) return // TODO: add error for not found

    Object.assign(old, item)

    return items.value[getItemIdxById(id)]
  }

  return {
    itemList,
    setItems,

    addItem,
    removeItemById,
    editItemById,
  }
})
