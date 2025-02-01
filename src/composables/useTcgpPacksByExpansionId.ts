import { db } from "@/db";
import type { Pack } from "@/db/models/pack.model";

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
