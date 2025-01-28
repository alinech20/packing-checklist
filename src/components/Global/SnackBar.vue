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
    <article class="snackbar" :class="`snackbar--${e.color}`" v-for="(e, i) in queue" :key="i">
      {{ e.message }}
    </article>
  </section>
</template>

<style lang="css">
.snackbar-container {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.snackbar {
  border-radius: 4px;
  margin: 5px;
  max-width: 400px;
  padding: 5px 10px;
  background-color: white;
  font-weight: bold;
}

.snackbar--darkgreen {
  color: darkgreen;
  border: 2px solid darkgreen;
}

.snackbar--darkorange {
  color: darkorange;
  border: 2px solid darkorange;
}

.snackbar--darkred {
  color: darkred;
  border: 2px solid darkred;
}

.snackbar--darkblue {
  color: darkblue;
  border: 2px solid darkblue;
}

.snackbar--darkslategray {
  color: darkslategray;
  border: 2px solid darkslategray;
}
</style>
