<script setup lang="ts">
import type { IButtonProps } from '@/types/forms.ts'

defineEmits(['click'])
defineProps<IButtonProps>()
</script>

<template>
  <button @click="$emit('click')">{{ text }}</button>
</template>

<style scoped lang="css"></style>
