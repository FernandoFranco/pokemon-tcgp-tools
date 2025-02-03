<template>
  <VContainer>
    <VCard>
      <VCardTitle>Settings</VCardTitle>
      <VCardText>
        <VBtn @click="exportData" color="primary" class="ma-2">
          Export Data
        </VBtn>
        <VBtn @click="importData" color="secondary" class="ma-2">
          Import Data
        </VBtn>
        <VBtn @click="clear" color="error" class="ma-2"> Clear Data </VBtn>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script lang="ts" setup>
import { useBrowserJsonFile } from "@/composables/useBrowserJsonFile";
import { useSnackbar } from "@/composables/useSnackbar";
import { useUserData, type UserData } from "@/composables/useUserData";

const snackbar = useSnackbar();
const { data, clearData } = useUserData();
const { exportFile, importFile } = useBrowserJsonFile();

function clear() {
  clearData();
}

function exportData() {
  exportFile(data.value, "my-data-tcgp.json");
}

async function importData() {
  const importedData = (await importFile()) as UserData;
  if (typeof importedData !== "object" || importedData === null) {
    snackbar.showSnackbar({
      message: "Invalid data format: not an object or null",
      type: "error",
    });
    return;
  }

  if (!("cards" in importedData)) {
    snackbar.showSnackbar({
      message: "Invalid data format: 'cards' property missing",
      type: "error",
    });
    return;
  }

  if (!Array.isArray(importedData.cards)) {
    snackbar.showSnackbar({
      message: "Invalid data format: 'cards' is not an array",
      type: "error",
    });
    return;
  }

  if (!importedData.cards.every((card: unknown) => typeof card === "string")) {
    snackbar.showSnackbar({
      message:
        "Invalid data format: 'cards' array contains non-string elements",
      type: "error",
    });
    return;
  }

  data.value = importedData;
}
</script>
