<script setup lang="ts">
import PackingChecklist from '@/components/PackingChecklist/PackingChecklist.vue'
import AddItem from '@/components/PackingItem/AddItem.vue'
import { useChecklistStore } from '@/stores/checklist.ts'

const checklistStore = useChecklistStore()
const { resetActiveChecklist } = checklistStore
</script>

<template>
  <input type="button" value="Back to Checklists" @click="resetActiveChecklist" />
  <AddItem />
  <PackingChecklist />
</template>
