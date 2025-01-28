<script setup lang="ts">
import PackingChecklist from '@/components/PackingChecklist/PackingChecklist.vue'
import AddItem from '@/components/PackingItem/AddItem.vue'
import { useChecklistStore } from '@/stores/checklist.ts'
import CustomButton from '@/components/Global/forms/CustomButton.vue'
import { Icon } from '@iconify/vue'

const checklistStore = useChecklistStore()
const { resetActiveChecklist, getActiveChecklist } = checklistStore
</script>

<template>
  <h1 class="content-title">Edit your packing checklist</h1>

  <section class="checklist__title">
    <CustomButton @click="resetActiveChecklist" icon>
      <template #icon><Icon icon="pixelarticons:backburger" /></template>
    </CustomButton>
    <h2 class="checklist__title-text">{{ getActiveChecklist.name }}</h2>
  </section>

  <AddItem />
  <PackingChecklist />
</template>

<style lang="css">
.checklist__title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checklist__title .custom-button {
  color: white;
  background-color: darkorange;
  margin-right: 0.5em;
}
</style>
