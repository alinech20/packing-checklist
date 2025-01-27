<script setup lang="ts">
import type { IInputProps } from '@/types/forms.ts'
import { useTextUtils } from '@/composables/useTextUtils.ts'

defineEmits(['change'])
defineProps<IInputProps>()
const [model, modifiers] = defineModel({
  set(v) {
    const { capitalizeWord, capitalizeEachWord } = useTextUtils()

    if (typeof v !== 'string') return v
    if (modifiers.capitalize) return capitalizeWord(v)
    if (modifiers.capitalizeEach) return capitalizeEachWord(v)
  },
})
</script>

<template>
  <article class="custom-input">
    <label v-if="label && label_for" class="custom-input__label" :for="label_for">
      {{ label }}
    </label>
    <input
      :id="label_for"
      :type="type"
      class="custom-input__input"
      :disabled="!!disabled"
      :min="min"
      :max="max"
      :step="step"
      v-model="model"
      @change="$emit('change')"
    />
  </article>
</template>

<style lang="css"></style>
