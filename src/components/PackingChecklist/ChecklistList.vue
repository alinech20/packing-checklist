<script setup lang="ts">
import ChecklistListItem from '@/components/PackingChecklist/ChecklistListItem.vue'
import { useChecklistStore } from '@/stores/checklist.ts'
import { storeToRefs } from 'pinia'

const checklistStore = useChecklistStore()
const { checklistList } = storeToRefs(checklistStore)
</script>

<template>
  <section class="checklist-section">
    <article class="checklist-list">
      <ChecklistListItem
        v-for="checklist in checklistList"
        :key="checklist.id"
        :checklist="checklist"
      />
    </article>
  </section>
</template>

<style lang="css">
.checklist-section {
  margin-top: 2rem;
}
</style>
