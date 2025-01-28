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
  <main class="content">
    <ChecklistView v-if="getActiveChecklist.id || getActiveChecklist.temp_id" />
    <ChecklistListView v-else />
    <SnackBar />
  </main>
</template>

<style lang="css">
.content {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
