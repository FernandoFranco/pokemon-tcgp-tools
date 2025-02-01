<template>
  <VAppBar app>
    <template #title>
      <a :href="`${baseUrl}/`">
        <VImg src="@/assets/logo.png" max-width="64" />
      </a>
    </template>

    <template #append>
      <VBtn :disabled="loading" @click="() => exportDatabase()">
        Export Data
      </VBtn>

      <VBtn @click="() => importDatabase()"> Import Data </VBtn>
    </template>
  </VAppBar>

  <VMain>
    <RouterView />
  </VMain>
</template>

<script lang="ts" setup>
import { useBaseUrl } from "@/composables/useBaseUrl";
import { useExportData } from "@/composables/useExportData";
import { useImportData } from "@/composables/useImportData";

const baseUrl = useBaseUrl();
const { loading, exportDatabase } = useExportData();
const { importDatabase } = useImportData();
</script>
