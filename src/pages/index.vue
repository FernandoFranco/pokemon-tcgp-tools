<template>
  <VContainer>
    <VCard>
      <VCardTitle>Melhor chance de card novo</VCardTitle>
      <VCardText>
        Em breve, aqui você poderá ver qual o melhor pack para escolher
      </VCardText>
    </VCard>

    <VRow class="mt-4">
      <template v-for="expansion in expansions" :key="expansion.id">
        <VCol cols="12" sm="6" md="4" lg="3">
          <VHover #default="{ props, isHovering }">
            <VCard
              v-bind="props"
              :elevation="isHovering ? 10 : 2"
              :to="`/expansion/${expansion.id}`"
              rounded="pill"
            >
              <VImg
                :src="`${baseUrl}/images/expansions/${expansion.id}.png`"
                class="ma-4"
                max-height="64"
              />
            </VCard>
          </VHover>
        </VCol>
      </template>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useBaseUrl } from "@/composables/useBaseUrl";
import { useTcgpExpansions } from "@/composables/useTcgpExpansions";
import { VCardText } from "vuetify/components";

const baseUrl = useBaseUrl();
const { expansions } = useTcgpExpansions();
</script>
