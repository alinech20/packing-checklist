<script setup lang="ts">
import type { IChecklist } from '@/types/checklist.ts'
import { ref } from 'vue'
import { useChecklistStore } from '@/stores/checklist.ts'
import { usePackingItemStore } from '@/stores/packing-item.ts'
import CustomInput from '@/components/Global/forms/CustomInput.vue'
import CustomButton from '@/components/Global/forms/CustomButton.vue'

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

const { removeAllItemsByChecklistId, removeAllItemsByChecklistTempId } = usePackingItemStore()

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
        <CustomButton class="checklist-item__remove" @click="removeChecklist" text="Remove" />
        <CustomButton
          class="checklist-item__edit"
          v-if="!editMode"
          @click="editMode = true"
          text="Edit name"
        />
        <CustomButton class="checklist-item__save" v-else text="Save" @click="saveChecklist" />
        <CustomButton class="checklist-item__edit-items" @click="setActiveChecklist" text="Edit" />
      </section>
      <section class="checklist-item__data">
        <CustomInput
          label="Name"
          label_for="name"
          class="checklist-item__field"
          type="text"
          :disabled="!editMode"
          v-model.trim.capitalizeEach="name"
        />
      </section>
    </form>
  </article>
</template>

<style scoped lang="css"></style>
