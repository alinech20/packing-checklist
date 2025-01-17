<script setup lang="ts">
import { ref } from 'vue'
import { usePackingItemStore } from '@/stores/packing-item.ts'

const { addItem } = usePackingItemStore()

const name = ref<string>('')
const submit = () => {
  addItem(name.value)
  name.value = ''
}
</script>

<template>
  <!-- TODO: design -->
  <section class="add-item">
    <form class="add-item__form" @submit.prevent="submit()">
      <input type="text" class="add-item__input" placeholder="Name" v-model="name" />
      <input type="submit" class="add-item__submit" value="Add" />
    </form>
  </section>
</template>

<style lang="css"></style>
