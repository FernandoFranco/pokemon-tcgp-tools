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
        <VBtn @click="clearData" color="error" class="ma-2"> Clear Data </VBtn>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script lang="ts" setup>
import { useUserData } from "@/composables/useUserData";

const { clearData } = useUserData();

function exportData() {}

function importData() {}
</script>
