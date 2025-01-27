<script setup lang="ts">
import type { IButtonProps } from '@/types/forms.ts'

defineEmits(['click'])
defineProps<IButtonProps>()
</script>

<template>
  <button class="custom-button" @click.stop.prevent="$emit('click')">{{ text }}</button>
</template>

<style lang="css">
.custom-button {
  text-transform: uppercase;
  cursor: pointer;
}
</style>
