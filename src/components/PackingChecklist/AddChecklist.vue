<script setup lang="ts">
import { ref } from 'vue'
import { useChecklistStore } from '@/stores/checklist.ts'

const { addChecklist } = useChecklistStore()

const name = ref<string>('')
const submit = () => {
  addChecklist(name.value)
  name.value = ''
}
</script>

<template>
  <section class="add-checklist">
    <form class="add-checklist__form" @submit.prevent="submit()">
      <input type="text" class="add-checklist__input" placeholder="Enter Name" v-model="name" />
      <input type="submit" class="add-checklist__submit" value="Add" />
    </form>
  </section>
</template>

<style lang="css"></style>
