import type { Component } from 'vue'

// to add types as needed
type TInputType = 'text' | 'number' | 'checkbox'

export interface IInputProps {
  label?: string
  label_for?: string
  type: TInputType
  value?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
}

export interface IButtonProps {
  text?: string
  icon?: Component
}
