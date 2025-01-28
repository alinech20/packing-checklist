<script setup lang="ts">
import CustomButton from '@/components/Global/forms/CustomButton.vue'
import { Icon } from '@iconify/vue'

defineProps<{
  editMode: boolean
}>()
defineEmits(['removeClick', 'editClick', 'saveClick'])
</script>

<template>
  <section class="packing-item__actions">
    <CustomButton class="packing-item__remove" @click="$emit('removeClick')" icon>
      <template #icon><Icon icon="pixelarticons:close" /></template>
    </CustomButton>
    <CustomButton class="packing-item__edit" v-if="!editMode" @click="$emit('editClick')" icon>
      <template #icon><Icon icon="pixelarticons:edit" /></template>
    </CustomButton>
    <CustomButton class="packing-item__save" type="submit" v-else @click="$emit('saveClick')" icon>
      <template #icon><Icon icon="pixelarticons:save" /></template>
    </CustomButton>
  </section>
</template>

<style lang="css">
.packing-item__actions {
  display: flex;
  align-items: center;
}

.packing-item__remove,
.packing-item__edit,
.packing-item__save {
  color: white;
  margin-right: 0.25rem;
}

.packing-item__remove {
  background-color: darkred;
}

.packing-item__edit {
  background-color: darkblue;
}

.packing-item__save {
  background-color: darkgreen;
}
</style>
