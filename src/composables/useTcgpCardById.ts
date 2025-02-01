import { db } from "@/db";
import type { Card } from "@/db/models/card.model";

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
