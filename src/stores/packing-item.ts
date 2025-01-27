import { defineStore } from 'pinia'
import { PINIA_STORE_KEYS } from '@/constants/stores.ts'
import { computed, ref } from 'vue'
import type { IPackingItem } from '@/types/checklist.ts'
import { useErrorStore } from '@/stores/error.ts'
import { ERROR_LEVEL } from '@/enums/errors.ts'

export const usePackingItemStore = defineStore(
  PINIA_STORE_KEYS.PACKING_ITEM,
  () => {
    const { addError } = useErrorStore()

    const items = ref<IPackingItem[]>([])
    const itemList = computed(() => items.value)
    const setItems = (list: IPackingItem[]) => (items.value = list)

    const getItemById = (id: number): IPackingItem | undefined =>
      items.value.find((item) => item.id === id)
    const getItemByTempId = (id: string): IPackingItem | undefined =>
      items.value.find((item) => item.temp_id === id)
    const getItemByName = (name: string): IPackingItem | undefined =>
      items.value.find((item) => item.name === name)
    const getItemIdxById = (id: number): number => items.value.findIndex((item) => item.id === id)
    const getItemIdxByTempId = (id: string): number =>
      items.value.findIndex((item) => item.temp_id === id)

    /**
     * Adds an item to the list
     *
     * @param { string } name Name of the item to add
     *
     * @return Added item in case of success, undefined otherwise
     */
    const addItem = (name: string): IPackingItem | undefined => {
      if (!name) return // don't add without name
      if (getItemByName(name)) {
        addError({
          message: 'An item with this name already exists',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      items.value.push({
        temp_id: (Math.random() + 1).toString(36).substring(2),
        name,
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
      if (idx === -1) {
        addError({
          message: 'Item not found',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

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
    const removeItemByTempId = (id: string | undefined) => {
      if (!id) return
      return removeItemByIdx(getItemIdxByTempId(id))
    }

    const editItem = (old: IPackingItem | undefined, val: Partial<IPackingItem>) => {
      if (!old) {
        addError({
          message: 'Item not found',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      Object.assign(old, val)
    }

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
      editItem(old, item)
      return items.value[getItemIdxById(id)]
    }

    const editItemByTempId = (
      id: string | undefined,
      item: Partial<IPackingItem>,
    ): IPackingItem | undefined => {
      if (!id) return

      const old = getItemByTempId(id)
      editItem(old, item)
      return items.value[getItemIdxByTempId(id)]
    }

    const removeAllItemsByChecklistId = (id: number) => {
      items.value.filter((item) => item.checklist_id !== id)
    }

    const removeAllItemsByChecklistTempId = (id: string | undefined) => {
      if (!id) return
      items.value.filter((item) => item.checklist_temp_id !== id)
    }

    return {
      items,
      itemList,
      setItems,

      addItem,
      removeItemById,
      removeItemByTempId,
      editItemById,
      editItemByTempId,
      removeAllItemsByChecklistId,
      removeAllItemsByChecklistTempId,
    }
  },
  {
    persist: true,
  },
)
