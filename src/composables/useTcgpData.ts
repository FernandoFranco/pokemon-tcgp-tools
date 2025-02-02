import { db } from "@/db";
import type { Card } from "@/db/models/card.model";
import type { Expansion } from "@/db/models/expansion.model";
import type { Pack } from "@/db/models/pack.model";

export function useTcgpExpansions() {
  const expansions = ref<Expansion[]>([]);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    expansions.value = await db.expansions.toArray();
    loading.value = false;
  });

  return {
    loading,
    expansions,
  };
}

export function useTcgpExpansionById(id: string) {
  const expansion = ref<Expansion | undefined>(undefined);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    expansion.value = await db.expansions.where({ id }).first();
    loading.value = false;
  });

  return {
    loading,
    expansion,
  };
}

export function useTcgpPacksByExpansionId(expansionId: string) {
  const packs = ref<Pack[]>([]);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    packs.value = await db.packs.where({ expansionId }).toArray();
    loading.value = false;
  });

  return {
    loading,
    packs,
  };
}

export function useTcgpPackById(id: string) {
  const pack = ref<Pack | undefined>(undefined);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    pack.value = await db.packs.where({ id }).first();
    loading.value = false;
  });

  return {
    pack,
    loading,
  };
}

export function useTcgpCards() {
  const cards = ref<Card[]>([]);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    cards.value = await db.cards.toArray();
    loading.value = false;
  });

  return {
    loading,
    cards,
  };
}

export function useTcgpCardsByExpansionId(expansionId: string) {
  const cards = ref<Card[]>([]);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    cards.value = await db.cards.where({ expansionId }).toArray();
    loading.value = false;
  });

  return {
    loading,
    cards,
  };
}

export function useTcgpCardsByPackId(packId: string) {
  const cards = ref<Card[]>([]);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    cards.value = await db.cards.where({ packId }).toArray();
    loading.value = false;
  });

  return {
    loading,
    cards,
  };
}

export function useTcgpCardById(id: string) {
  const card = ref<Card | undefined>(undefined);
  const loading = ref(false);

  onMounted(async () => {
    loading.value = true;
    card.value = await db.cards.where({ id }).first();
    loading.value = false;
  });

  return {
    loading,
    card,
  };
}
