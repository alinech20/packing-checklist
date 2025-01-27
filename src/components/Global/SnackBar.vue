<script setup lang="ts">
import { ref } from 'vue'
import type { ISnackbarMessage } from '@/types/errors.ts'
import { useErrorStore } from '@/stores/error.ts'
import { SNACKBAR_DURATION } from '@/constants/bus-events.ts'

const { snackbar } = useErrorStore()
const queue = ref<ISnackbarMessage[]>([])

snackbar.on((e: ISnackbarMessage) => {
  queue.value.push(e)

  const timeout = e.time_overwrite || SNACKBAR_DURATION

  setTimeout(() => {
    const idx = queue.value.indexOf(e)
    queue.value.splice(idx, 1)
  }, timeout)
})
</script>

<template>
  <section class="snackbar-container">
    <article class="snackbar" v-for="(e, i) in queue" :key="i">
      {{ e.message }}
    </article>
  </section>
</template>

<style lang="css">
.snackbar-container {
  position: absolute;
  top: 10px;
  left: 100px;
}

.snackbar {
  border: 1px solid black;
  margin: 5px;
  width: 300px;
  padding: 5px 10px;
}
</style>
