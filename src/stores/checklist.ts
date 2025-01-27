import { PINIA_STORE_KEYS } from '@/constants/stores.ts'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { IChecklist } from '@/types/checklist.ts'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import { useErrorStore } from '@/stores/error.ts'
import { ERROR_LEVEL } from '@/enums/errors.ts'

export const useChecklistStore = defineStore(
  PINIA_STORE_KEYS.CHECKLIST,
  () => {
    const { addError } = useErrorStore()

    const checklists = ref<IChecklist[]>([])
    const checklistList = computed(() => checklists.value)

    // various getters
    const getChecklistByName = (name: string): IChecklist | undefined =>
      checklistList.value.find((item) => item.name === name)
    const getChecklistById = (id: number): IChecklist | undefined =>
      checklistList.value.find((item) => item.id === id)
    const getChecklistByTempId = (id: string): IChecklist | undefined =>
      checklistList.value.find((item) => item.temp_id === id)
    const getChecklistIdxById = (id: number): number =>
      checklistList.value.findIndex((item) => item.id === id)
    const getChecklistIdxByTempId = (id: string): number =>
      checklistList.value.findIndex((item) => item.temp_id === id)

    /**
     * Adds a checklist to the list
     *
     * @param { string } name Name of the checklist to add
     *
     * @return Added checklist in case of success, undefined otherwise
     */
    const addChecklist = (name: string): IChecklist | undefined => {
      if (!name) return // don't add without name
      if (getChecklistByName(name)) {
        addError({
          message: 'A checklist with this name already exists',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      checklistList.value.push({
        temp_id: (Math.random() + 1).toString(36).substring(2),
        name,
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

    // remove by id or temp_id if it's not saved in a db
    const removeChecklistById = (id: number) => removeChecklistByIdx(getChecklistIdxById(id))
    const removeChecklistByTempId = (id?: string) => {
      if (!id) return
      return removeChecklistByIdx(getChecklistIdxByTempId(id))
    }

    /**
     * Performs the actual edit of a checklist
     *
     * @param { IChecklist } old Checklist to edit
     * @param { Partial<IChecklist> } val New value for the checklist
     */
    const editChecklist = (old: IChecklist | undefined, val: Partial<IChecklist>) => {
      if (!old) {
        addError({
          message: 'Checklist not found',
          level: ERROR_LEVEL.ERROR,
          snackbar: true,
        })

        return
      }

      Object.assign(old, val)
    }

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
      editChecklist(old, checklist)
      return checklists.value[getChecklistIdxById(id)]
    }

    /**
     * Edits a checklist by id
     *
     * @param { number } id Id of the checklist to edit
     * @param { Partial<IChecklist> } checklist New info of the checklist
     *
     * @return Edited item in case of success, undefined otherwise
     */
    const editChecklistByTempId = (
      id: string | undefined,
      checklist: Partial<IChecklist>,
    ): IChecklist | undefined => {
      if (!id) return

      const old = getChecklistByTempId(id)
      editChecklist(old, checklist)
      return checklists.value[getChecklistIdxByTempId(id)]
    }

    const activeChecklist = ref({} as IChecklist)
    const getActiveChecklist = computed(() => activeChecklist.value)
    const setActiveChecklist = (idx: number) => {
      activeChecklist.value = checklists.value[idx]
      usePackingItemStore().setItems(activeChecklist.value.items)
    }
    const setActiveChecklistById = (id: number, redirect: boolean = true): number | undefined => {
      const idx = getChecklistIdxById(id)
      setActiveChecklist(idx)

      if (!redirect) return
      return id
    }
    const setActiveChecklistByTempId = (
      id: string | undefined,
      redirect: boolean = true,
    ): string | undefined => {
      if (!id) return

      const idx = getChecklistIdxByTempId(id)
      setActiveChecklist(idx)

      if (!redirect) return
      return id
    }
    const resetActiveChecklist = () => (activeChecklist.value = {} as IChecklist)

    return {
      checklists,
      checklistList,
      addChecklist,
      removeChecklistById,
      removeChecklistByTempId,
      editChecklistById,
      editChecklistByTempId,

      getActiveChecklist,
      setActiveChecklistById,
      setActiveChecklistByTempId,
      resetActiveChecklist,
    }
  },
  {
    persist: true,
  },
)
