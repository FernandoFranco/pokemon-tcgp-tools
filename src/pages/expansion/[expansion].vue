<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" class="text-center">
        <VImg
          :src="`${baseUrl}/images/expansions/${expansion?.id}.png`"
          alt="Expansion Logo"
          max-height="64"
          class="ma-4"
        />
      </VCol>
    </VRow>

    <VRow justify="space-evenly">
      <template v-for="pack in packs" :key="pack.id">
        <VCol cols="4" class="text-center">
          <VImg
            :src="`${baseUrl}/images/packs/${pack.id}.png`"
            alt="Pack Image"
            max-height="256"
          />
        </VCol>
      </template>
    </VRow>

    <VCard class="mt-12" elevation="2">
      <VCardText>
        <VRow no-gutters>
          {{ expansion?.name }}
          <VSpacer />
          <span> {{ myTotalCardsFromExpansion }} / {{ cards?.length }} </span>
        </VRow>
        <VProgressLinear
          :model-value="myTotalCardsFromExpansion ?? 0"
          :max="cards?.length ?? 100"
          color="primary"
          height="8"
          rounded
          stream
        />
      </VCardText>

      <VDivider />

      <VCardText>
        <template v-for="(pack, index) in packs" :key="pack.id">
          <VRow :class="index > 0 ? 'mt-3' : undefined" no-gutters>
            {{ getPackName(pack.id) }}
            <VSpacer />
            <span>
              {{ getMyCardsByPackId(pack.id).length }}
              /
              {{ cards?.filter((card) => card.packId === pack.id).length }}
            </span>
          </VRow>
          <VProgressLinear
            :model-value="getMyCardsByPackId(pack.id).length ?? 0"
            :max="getCardsByPackId(pack.id).length ?? 100"
            :color="getPackColor(pack.id)"
            rounded
            stream
          />
        </template>
      </VCardText>
    </VCard>

    <VDataTableVirtual
      v-model="myCards"
      :headers="[
        {
          title: 'ID',
          value: 'id',
        },
        {
          title: 'Name',
          value: 'name',
        },
        {
          title: 'Pack',
          value: 'packId',
        },
        {
          title: 'Rarity',
          value: 'rarity',
        },
      ]"
      :items="cards"
      :item-value="(card) => card.id"
      show-select
      hide-default-footer
      class="mt-4 elevation-2 rounded-xl"
    >
      <template #[`header.data-table-select`] />

      <template #[`item.id`]="{ item }">
        <VChip size="small" variant="flat" color="black">
          {{ item.id }}
        </VChip>
      </template>

      <template #[`item.packId`]="{ item }">
        <VChip size="small" variant="flat" :color="getPackColor(item.packId)">
          {{ getPackName(item.packId) }}
        </VChip>
      </template>
    </VDataTableVirtual>
  </VContainer>
</template>

<script setup lang="ts">
import { useBaseUrl } from "@/composables/useBaseUrl";
import { useTcgpCardsByExpansionId } from "@/composables/useTcgpCardsByExpansionId";
import { useTcgpExpansionById } from "@/composables/useTcgpExpansionById";
import { useTcgpMyCards } from "@/composables/useTcgpMyCards";
import { useTcgpPacksByExpansionId } from "@/composables/useTcgpPacksByExpansionId";
import type { Pack } from "@/db/models/pack.model";
import { useRoute } from "vue-router";
import { VChip } from "vuetify/components";

const baseUrl = useBaseUrl();
const route = useRoute<"/expansion/[expansion]">();

const { expansion } = useTcgpExpansionById(route.params.expansion);
const { packs } = useTcgpPacksByExpansionId(route.params.expansion);
const { cards } = useTcgpCardsByExpansionId(route.params.expansion);
const { myCards } = useTcgpMyCards();

const myTotalCardsFromExpansion = computed(
  () => cards.value.filter((card) => myCards.value.includes(card.id)).length
);

function getPackFromId(id?: string): Pack | undefined {
  if (!id) return undefined;
  return packs.value.find((pack) => pack.id === id);
}

function getUnfindedPackName(id?: string) {
  return id ? id[0].toUpperCase() + id.slice(1) : undefined;
}

function getPackColor(id?: string) {
  return getPackFromId(id)?.color ?? "grey";
}

function getPackName(id?: string) {
  return getPackFromId(id)?.name ?? getUnfindedPackName(id) ?? "All";
}

function getMyCardsByPackId(packId: string) {
  return cards.value.filter(
    (card) => card.packId === packId && myCards.value.includes(card.id)
  );
}

function getCardsByPackId(packId: string) {
  return cards.value.filter((card) => card.packId === packId);
}
</script>
