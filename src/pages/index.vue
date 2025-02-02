<template>
  <VContainer>
    <VCard>
      <VCardTitle>Best chance for a new card</VCardTitle>
      <VCardText>
        Soon, you will be able to see which pack is the best to choose
      </VCardText>
    </VCard>

    <VRow class="mt-3">
      <template v-for="expansion in expansions" :key="expansion.id">
        <VCol cols="12" sm="6" md="4" lg="3">
          <VHover #default="{ props, isHovering }">
            <VCard
              v-bind="props"
              :elevation="isHovering ? 10 : 2"
              :to="`/expansion/${expansion.id}`"
            >
              <VImg
                :src="`${baseUrl}/images/expansions/${expansion.id}.png`"
                class="mt-4"
                max-height="48"
              />

              <VChip
                size="x-small"
                class="position-absolute top-0 right-0 ma-4"
              >
                {{ getMyCardsByExpansionId(expansion.id).length }}
                /
                {{ getCardsByExpansionId(expansion.id).length }}
              </VChip>

              <VCardText>
                <VProgressLinear
                  :model-value="
                    getMyCardsByExpansionId(expansion.id).length ?? 0
                  "
                  :max="getCardsByExpansionId(expansion.id).length ?? 100"
                  color="primary"
                  rounded
                  stream
                />
              </VCardText>
            </VCard>
          </VHover>
        </VCol>
      </template>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useBaseUrl } from "@/composables/useBaseUrl";
import { useTcgpCards, useTcgpExpansions } from "@/composables/useTcgpData";
import { useTcgpMyCards } from "@/composables/useTcgpMyCards";
import { VCardText } from "vuetify/components";

const baseUrl = useBaseUrl();
const { expansions } = useTcgpExpansions();

const { myCards } = useTcgpMyCards();
const { cards } = useTcgpCards();

function getCardsByExpansionId(expansionId: string) {
  return cards.value?.filter((card) => card.expansionId === expansionId) ?? [];
}

function getMyCardsByExpansionId(expansionId: string) {
  return getCardsByExpansionId(expansionId).filter((card) =>
    myCards.value.includes(card.id)
  );
}
</script>
