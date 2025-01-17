<script setup lang="ts">
import type { IChecklist } from '@/interfaces/checklist.ts'
import { ref } from 'vue'
import { useChecklistStore } from '@/stores/checklist.ts'

const props = defineProps<{
  checklist: IChecklist
}>()

const name = ref(props.checklist.name)

const { removeChecklistById, editChecklistById, setActiveChecklistById } = useChecklistStore()
const editMode = ref(false)

const saveChecklist = (): void => {
  editChecklistById(props.checklist.id, {
    name: name.value,
  })

  editMode.value = false
}
</script>

<template>
  <article class="checklist-item">
    <form class="checklist-item__edit-form" @submit.prevent="saveChecklist">
      <section class="checklist-item__actions">
        <input
          type="button"
          class="checklist-item__remove"
          @click="removeChecklistById(checklist.id)"
          value="Remove"
        />
        <input
          type="button"
          class="checklist-item__edit"
          v-if="!editMode"
          @click="editMode = true"
          value="Edit name"
        />
        <input type="submit" class="checklist-item__save" v-else value="Save" />
        <input
          type="button"
          class="checklist-item__edit-items"
          @click="setActiveChecklistById(checklist.id)"
          value="Edit"
        />
      </section>
      <section class="checklist-item__data">
        <label class="checklist-item__field-label" for="name">Name</label>
        <input
          id="name"
          class="checklist-item__field"
          type="text"
          :disabled="!editMode"
          v-model="name"
        />
      </section>
    </form>
  </article>
</template>

<style scoped lang="css"></style>
