<template>
  <VCard rounded="xl" height="128">
    <VCardTitle class="text-capitalize">
      {{ props.data.name }}
    </VCardTitle>
    <VImg :src="`/images/packs/${props.data.id}.png`" height="160" />
  </VCard>
</template>

<script lang="ts" setup>
import type { DataPack } from "@/types/data-pack.type";
import { defineProps } from "vue";

const props = defineProps<{
  data: DataPack;
}>();
</script>
