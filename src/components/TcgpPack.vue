<template>
  <VCard rounded="xl">
    <VCardTitle class="text-capitalize">
      {{ props.data.name }}
    </VCardTitle>
  </VCard>
</template>

<script lang="ts" setup>
import type { DataPack } from "@/types/pack.type";
import { defineProps } from "vue";

const props = defineProps<{
  data: DataPack;
}>();
</script>
