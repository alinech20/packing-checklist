<script setup lang="ts">
import { ref } from 'vue'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import CustomButton from '@/components/Global/forms/CustomButton.vue'
import CustomInput from '@/components/Global/forms/CustomInput.vue'

const { addItem } = usePackingItemStore()

const name = ref<string>('')
const add = () => {
  addItem(name.value)
  name.value = ''
}
</script>

<template>
  <!-- TODO: design -->
  <section class="add-item">
    <form class="add-item__form">
      <CustomInput
        type="text"
        class="add-item__input"
        label="Name"
        label_for="name"
        v-model.trim.capitalize="name"
      />
      <CustomButton class="add-item__submit" text="Add" @click="add" />
    </form>
  </section>
</template>

<style lang="css">
.add-item {
  text-align: center;
}

.add-item__input {
  display: inline-block;
}
</style>
