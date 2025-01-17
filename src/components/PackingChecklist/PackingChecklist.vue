<script setup lang="ts">
import PackingItem from '@/components/PackingItem/PackingItem.vue'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import { storeToRefs } from 'pinia'

const packingItemStore = usePackingItemStore()
const { itemList } = storeToRefs(packingItemStore)
</script>

<template>
  <section class="checklist-section">
    <article class="checklist">
      <PackingItem v-for="item in itemList" :key="item.id" :item="item" />
    </article>
  </section>
</template>

<style scoped></style>
