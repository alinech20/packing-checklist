<script setup lang="ts">
import { ref } from 'vue'
import { useChecklistStore } from '@/stores/checklist.ts'
import CustomInput from '@/components/Global/forms/CustomInput.vue'
import CustomButton from '@/components/Global/forms/CustomButton.vue'

const { addChecklist } = useChecklistStore()

const name = ref<string>('')
const add = () => {
  addChecklist(name.value)
  name.value = ''
}
</script>

<template>
  <section class="add-checklist">
    <form class="add-checklist__form">
      <CustomInput
        label="Name"
        label_for="name"
        type="text"
        class="add-checklist__input"
        v-model.trim.capitalizeEach="name"
      />
      <CustomButton class="add-checklist__submit" text="Create" @click="add" />
    </form>
  </section>
</template>

<style lang="css">
.add-checklist {
  text-align: center;
}

.add-checklist__form .add-checklist__input {
  display: inline-block;
}
</style>
