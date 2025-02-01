<template>
  <VAppBar app>
    <template #title>
      <a :href="`${baseUrl}/`">
        <VImg src="@/assets/logo.png" width="64" />
      </a>
    </template>

    <template #append>
      <VBtn
        :disabled="loading"
        prepend-icon="mdi-upload-outline"
        @click="() => exportDatabase()"
      >
        Export Data
      </VBtn>

      <VBtn prepend-icon="mdi-download-outline" @click="() => importDatabase()">
        Import Data
      </VBtn>
    </template>
  </VAppBar>

  <VMain class="bg-grey-lighten-3">
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

<style lang="scss" scoped>
.v-toolbar-title {
  a {
    display: flex;
    width: 64px;
  }
}
</style>
