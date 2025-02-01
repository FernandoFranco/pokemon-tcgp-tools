<template>
  <VContainer>
    <VCard>
      <VCardTitle>Melhor chance de card novo</VCardTitle>
    </VCard>

    <template v-for="expansion in expansions" :key="expansion.id">
      <VHover #default="{ props, isHovering }">
        <VCard
          v-bind="props"
          :elevation="isHovering ? 10 : 2"
          :to="`/expansion/${expansion.id}`"
        >
          <VImg :src="`/images/expansions/${expansion.id}.png`" class="ma-4" />
        </VCard>
      </VHover>
    </template>
  </VContainer>
</template>

<script setup lang="ts">
import { useTcgpExpansions } from "@/composables/useTcgpExpansions";
const { expansions } = useTcgpExpansions();
</script>
