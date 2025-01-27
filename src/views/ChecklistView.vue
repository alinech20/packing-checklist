<script setup lang="ts">
import PackingChecklist from '@/components/PackingChecklist/PackingChecklist.vue'
import AddItem from '@/components/PackingItem/AddItem.vue'
import { useChecklistStore } from '@/stores/checklist.ts'
import CustomButton from '@/components/Global/forms/CustomButton.vue'

const checklistStore = useChecklistStore()
const { resetActiveChecklist, getActiveChecklist } = checklistStore
</script>

<template>
  <h1 class="content-title">Edit your packing checklist</h1>

  <section class="checklist__title">
    <CustomButton text="Back to Checklists" @click="resetActiveChecklist" />
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
</style>
