<script setup lang="ts">
import CustomButton from '@/components/Global/forms/CustomButton.vue'

defineProps<{
  editMode: boolean
}>()
defineEmits(['removeClick', 'editClick', 'saveClick'])
</script>

<template>
  <section class="packing-item__actions">
    <CustomButton class="packing-item__remove" @click="$emit('removeClick')" text="Remove" />
    <CustomButton
      class="packing-item__edit"
      v-if="!editMode"
      @click="$emit('editClick')"
      text="Edit"
    />
    <CustomButton class="packing-item__save" v-else @click="$emit('saveClick')" text="Save" />
  </section>
</template>

<style lang="css">
.packing-item__actions {
  display: inline-block;
}
</style>
