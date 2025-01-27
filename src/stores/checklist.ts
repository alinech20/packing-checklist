import { PINIA_STORE_KEYS } from '@/constants/stores.ts'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IChecklist } from '@/interfaces/checklist.ts'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import { useErrorStore } from '@/stores/error.ts'
import { ERROR_LEVEL } from '@/enums/errors.ts'
import { useTextUtils } from '@/composables/useTextUtils.ts'

export const useChecklistStore = defineStore(
  PINIA_STORE_KEYS.CHECKLIST,
  () => {
    const { capitalizeWord } = useTextUtils()
    const { addError } = useErrorStore()

    const checklists = ref<IChecklist[]>([])
    const checklistList = computed(() => checklists.value)

    const getChecklistByName = (name: string): IChecklist | undefined =>
      checklistList.value.find((item) => item.name === name)
    const getChecklistById = (id: number): IChecklist | undefined =>
      checklistList.value.find((item) => item.id === id)
    const getChecklistIdxById = (id: number): number =>
      checklistList.value.findIndex((item) => item.id === id)

    /**
     * Adds a checklist to the list
     *
     * @param { string } name Name of the checklist to add
     *
     * @return Added checklist in case of success, undefined otherwise
     */
    const addChecklist = (name: string): IChecklist | undefined => {
      const trimmedName = capitalizeWord(name.trim())

      if (!trimmedName) return // don't add without name
      if (getChecklistByName(trimmedName)) {
        addError({
          message: 'A checklist with this name already exists',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      checklistList.value.push({
        id: checklists.value.length + 1,
        name: trimmedName,
        items: [],
      } as IChecklist)

      return checklists.value[checklists.value.length - 1]
    }

    /**
     * Removes a checklist by idx
     *
     * @param {number} idx Index of the checklist to be removed
     *
     * @return Array of removed checklists or undefined if index is invalid
     */
    const removeChecklistByIdx = (idx: number): IChecklist[] | undefined => {
      if (idx === -1) {
        addError({
          message: 'Checklist not found',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      return checklists.value.splice(idx, 1)
    }

    const removeChecklistById = (id: number) => removeChecklistByIdx(getChecklistIdxById(id))

    /**
     * Edits a checklist by id
     *
     * @param { number } id Id of the checklist to edit
     * @param { Partial<IChecklist> } checklist New info of the checklist
     *
     * @return Edited item in case of success, undefined otherwise
     */
    const editChecklistById = (
      id: number,
      checklist: Partial<IChecklist>,
    ): IChecklist | undefined => {
      const old = getChecklistById(id)
      if (!old) {
        addError({
          message: 'Checklist not found',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      Object.assign(old, checklist)

      return checklists.value[getChecklistIdxById(id)]
    }

    const activeChecklist = ref({} as IChecklist)
    const getActiveChecklist = computed(() => activeChecklist.value)
    const setActiveChecklistById = (id: number, redirect: boolean = true): number | undefined => {
      const idx = getChecklistIdxById(id)
      activeChecklist.value = checklists.value[idx]
      usePackingItemStore().setItems(activeChecklist.value.items)

      if (!redirect) return
      return id
    }
    const resetActiveChecklist = () => (activeChecklist.value = {} as IChecklist)

    return {
      checklists,
      checklistList,
      addChecklist,
      removeChecklistById,
      editChecklistById,

      getActiveChecklist,
      setActiveChecklistById,
      resetActiveChecklist,
    }
  },
  {
    persist: true,
  },
)
