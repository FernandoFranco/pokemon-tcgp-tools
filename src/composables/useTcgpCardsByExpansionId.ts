import { db } from "@/db";
import type { Card } from "@/db/models/card.model";

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
