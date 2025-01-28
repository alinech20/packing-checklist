<script setup lang="ts">
import type { IButtonProps } from '@/types/forms.ts'

defineEmits(['click'])
defineProps<IButtonProps>()
</script>

<template>
  <button
    :type="type || 'button'"
    class="custom-button"
    :class="{
      'custom-button--icon': icon,
    }"
    @click.stop.prevent="$emit('click')"
  >
    <slot name="prepend-icon" />
    <slot v-if="icon" name="icon" />
    <span v-else>{{ text }}</span>
    <slot name="append-icon" />
  </button>
</template>

<style lang="css">
.custom-button {
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  padding: 2px;
  border: none;
  border-radius: 2px;
}

.custom-button--icon svg {
  display: block;
  font-size: 1.25em;
}
</style>
