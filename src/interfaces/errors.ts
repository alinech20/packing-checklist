import type { ERROR_LEVEL } from '@/enums/errors.ts'

export interface IError {
  code?: string
  message: string
  level: ERROR_LEVEL
  log?: boolean
  snackbar?: boolean
  time_overwrite?: number
}

export interface ISnackbarMessage extends IError {
  color?: string
}
