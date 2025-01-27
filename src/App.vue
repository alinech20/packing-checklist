<script setup lang="ts">
import ChecklistView from '@/views/ChecklistView.vue'
import ChecklistListView from '@/views/ChecklistListView.vue'

import { useChecklistStore } from '@/stores/checklist.ts'
import { storeToRefs } from 'pinia'
import SnackBar from '@/components/Global/SnackBar.vue'

const checklistStore = useChecklistStore()
const { getActiveChecklist } = storeToRefs(checklistStore)
</script>

<template>
  <h1>Create your packing checklist!</h1>
  <ChecklistListView v-if="!getActiveChecklist.id" />
  <ChecklistView v-else />
  <SnackBar />
</template>
