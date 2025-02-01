import { db } from "@/db";
import type { Card } from "@/db/models/card.model";

export function useTcgpCardsByExpansionId(packId: string) {
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
