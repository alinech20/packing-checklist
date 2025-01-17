import { PINIA_STORE_KEYS } from '@/constants/stores.ts'
import { defineStore } from 'pinia'
import { useEventBus } from '@vueuse/core'
import { BUS_EVENTS } from '@/constants/bus-events.ts'
import { computed, ref } from 'vue'
import type { IError, ISnackbarMessage } from '@/interfaces/errors.ts'
import { ERROR_LEVEL, MESSAGE_COLOR } from '@/enums/errors.ts'

export const useErrorStore = defineStore(PINIA_STORE_KEYS.ERROR, () => {
  const snackbar = useEventBus<ISnackbarMessage>(BUS_EVENTS.SNACKBAR)
  const displayError = (e: IError) => {
    const color =
      e.level > ERROR_LEVEL.ERROR
        ? MESSAGE_COLOR.ERROR
        : e.level > ERROR_LEVEL.INFO
          ? MESSAGE_COLOR.INFO
          : e.level > ERROR_LEVEL.VERBOSE
            ? MESSAGE_COLOR.VERBOSE
            : MESSAGE_COLOR.SUCCESS

    snackbar.emit({
      ...e,
      color,
    })
  }

  const errors = ref<IError[]>([])
  const errorList = computed(() => errors.value)

  const addError = (e: IError) => {
    errors.value.push(e)
    if (e.snackbar) displayError(e)
    if (e.log) {
      //   TODO: implement logger
    }
  }

  const clearErrors = () => (errors.value.length = 0)

  return {
    snackbar,
    errorList,
    addError,
    clearErrors,
  }
})
