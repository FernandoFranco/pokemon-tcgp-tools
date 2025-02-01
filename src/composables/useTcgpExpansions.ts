import { db } from "@/db";
import type { Expansion } from "@/db/models/expansion.model";

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
