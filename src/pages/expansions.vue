<template>
  <VContainer>
    <template v-for="expansion in expansions" :key="expansion.id">
      <VHover #default="{ isHovering, props }">
        <TcgpPack
          v-bind="props"
          class="mb-4"
          :data="expansion"
          :elevation="isHovering ? 4 : 1"
          @click="$router.push(`/boosters/${expansion.id}`)"
        />
      </VHover>
    </template>
  </VContainer>
</template>

<script lang="ts" setup>
import { useTcgpExpansions } from "@/composables/useTcgpData";

const { expansions } = useTcgpExpansions();
</script>
