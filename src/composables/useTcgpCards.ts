import { db } from "@/db";
import type { Card } from "@/db/models/card.model";

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
