<script setup lang="ts">
import type { IChecklist } from '@/types/checklist.ts'
import { ref } from 'vue'
import { useChecklistStore } from '@/stores/checklist.ts'
import CustomInput from '@/components/Global/forms/CustomInput.vue'
import CustomButton from '@/components/Global/forms/CustomButton.vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  checklist: IChecklist
}>()

const name = ref(props.checklist.name)

const {
  removeChecklistById,
  removeChecklistByTempId,
  editChecklistById,
  editChecklistByTempId,
  setActiveChecklistById,
  setActiveChecklistByTempId,
} = useChecklistStore()

const editMode = ref(false)

const saveChecklist = () => {
  editMode.value = false

  if (props.checklist.id)
    return editChecklistById(props.checklist.id, {
      name: name.value,
    })

  editChecklistByTempId(props.checklist.temp_id, {
    name: name.value,
  })
}

const removeChecklist = () => {
  if (props.checklist.id) return removeChecklistById(props.checklist.id)
  removeChecklistByTempId(props.checklist.temp_id)
}

const setActiveChecklist = () => {
  if (props.checklist.id) return setActiveChecklistById(props.checklist.id)
  setActiveChecklistByTempId(props.checklist.temp_id)
}
</script>

<template>
  <article class="checklist-item">
    <form class="checklist-item__edit-form">
      <section class="checklist-item__actions">
        <CustomButton class="checklist-item__remove" @click="removeChecklist" icon>
          <template #icon><Icon icon="pixelarticons:close" /></template>
        </CustomButton>
        <CustomButton class="checklist-item__edit-items" @click="setActiveChecklist" icon>
          <template #icon><Icon icon="pixelarticons:bulletlist" /></template>
        </CustomButton>
        <CustomButton class="checklist-item__edit" v-if="!editMode" @click="editMode = true" icon>
          <template #icon><Icon icon="pixelarticons:edit" /></template>
        </CustomButton>
        <CustomButton class="checklist-item__save" type="submit" v-else @click="saveChecklist" icon>
          <template #icon><Icon icon="pixelarticons:save" /></template>
        </CustomButton>
      </section>
      <section class="checklist-item__data">
        <CustomInput
          class="checklist-item__field"
          type="text"
          :disabled="!editMode"
          v-model.trim.capitalizeEach="name"
        />
      </section>
    </form>
  </article>
</template>

<style lang="css">
.checklist-item {
  margin-top: 0.5rem;
}

.checklist-item__edit-form {
  display: flex;
  align-items: center;
}

.checklist-item__data,
.checklist-item__actions {
  display: flex;
  align-items: center;
}

.checklist-item__actions .custom-button {
  margin-right: 0.25rem;
}

.checklist-item__remove,
.checklist-item__edit,
.checklist-item__edit-items,
.checklist-item__save {
  color: white;
}

.checklist-item__remove {
  background-color: darkred;
}

.checklist-item__edit {
  background-color: darkblue;
}

.checklist-item__edit-items {
  background-color: darkorange;
}

.checklist-item__save {
  background-color: darkgreen;
}
</style>
