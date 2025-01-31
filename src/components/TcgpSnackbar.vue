<template>
  <VSnackbar v-model="show" :color="color" :timeout="timeout">
    {{ message }}
    <template #actions>
      <VBtn variant="text" @click="show = false">Fechar</VBtn>
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from "@/composables/useSnackbar";

const { show, message, color, timeout } = useSnackbar();
</script>
